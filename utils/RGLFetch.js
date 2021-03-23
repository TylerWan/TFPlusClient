import * as https from "https";
import {isDiscordId, isSteamId} from "./parsing";
import {divToElo, eloToDiv, placementToEloAdj} from "./vals";
const cheerio = require('cheerio');

let formats = [
    "prolander",
    "highlander",
    "trad. sixes"
]

let forbiddenFormats = [
    "cup",
    "yomps",
    "eu",
    "au",
    "region",
    "popup",
    "experiment"
]

export default async function getRglProfileInfo(steamId, discordId) {
    if (!isSteamId(steamId) && !isDiscordId(discordId)) {
        return undefined;
    }
    let _steamId = steamId;
    let _discordId = discordId;
    return new Promise(
        (resolve, reject) => {
            let profileUrl = isSteamId(steamId) ? 'https://rgl.gg/Public/PlayerProfile.aspx?p=' + steamId :
                'https://rgl.gg/Public/PlayerProfile.aspx?d=' + discordId
            https.get(profileUrl, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    function elementText(e) {
                        return $(e).text().trim();
                    }

                    let rawPage = data;
                    if (rawPage.includes('Player does not exist in RGL')) {
                        return undefined;
                    }

                    let discordIndex = rawPage.indexOf("discordapp.com/users/");
                    if (discordIndex > 0) {
                        _discordId = rawPage.substr(discordIndex + discordIndex.length, 18)
                    }

                    let steamIndex = rawPage.indexOf("steamcommunity.com/profiles/")
                    if (steamIndex > 0) {
                        _steamId = rawPage.substr(steamIndex + steamIndex.length, 17)
                    }


                    let underProbation = rawPage.includes('Player is under probation')
                    let underBan = rawPage.includes('Player is banned from RGL')
                    const $ = cheerio.load(rawPage);
                    let discordTag = $('#ContentPlaceHolder1_Main_txtDiscordUsername').val();
                    let playerName = $('#ContentPlaceHolder1_Main_lblPlayerName').val();
                    let playerElos = {};
                    for (let fmt in formats) {
                        if (formats.hasOwnProperty(fmt)) {
                            playerElos[formats[fmt]] = {
                                elo: -1,
                                div: 'None'
                            };
                        }
                    }
                    let mainColChildren = $('.col-sm-9').children();
                    for (let child in mainColChildren) if (mainColChildren.hasOwnProperty(child)) {
                        let chVal = mainColChildren[child];
                        if (chVal.name === 'h3') {
                            let tCh = chVal.children[0];
                            if (tCh && tCh.name === 'span') {

                                let formatTitle = $(tCh).text().toLowerCase();
                                let format = formatTitle;
                                if ($(tCh).text().includes('RGL')) {

                                    //Check if proper format
                                    let isValidFormat = false;
                                    for (let fmt in formats) {
                                        if (formats.hasOwnProperty(fmt) && formatTitle.includes(formats[fmt])) {
                                            isValidFormat = true;
                                            format = formats[fmt];
                                        }
                                    }
                                    for (let ff in forbiddenFormats) {
                                        if (forbiddenFormats.hasOwnProperty(ff) && formatTitle.includes(forbiddenFormats[ff])) {
                                            isValidFormat = false;
                                        }
                                    }

                                    if (isValidFormat) {
                                        //console.log($(tCh).text())
                                        let formatElo = 0;
                                        let fmtTable = $(chVal).next()[0];
                                        fmtTable = $(fmtTable).next()[0];
                                        fmtTable = $(fmtTable.firstChild).next()[0];
                                        let tbr = $(fmtTable.firstChild).next()[0];
                                        let foundValidSeasons = 0;
                                        while (tbr && foundValidSeasons < 2) {
                                            let season = $(tbr.firstChild).next()[0];
                                            let div = $(season).next()[0];
                                            let team = $(div).next()[0];
                                            let endRank = $(team).next()[0];
                                            let recW = $(endRank).next()[0];
                                            let roundsWith = 0;
                                            let rwW = elementText(recW).split('-');
                                            let rlW = parseInt(rwW[1].replace(/[^0-9]/g, ''));
                                            rwW = parseInt(rwW[0].replace(/[^0-9]/g, ''));
                                            roundsWith = rwW + rlW;
                                            let recWo = $(recW).next()[0];
                                            let amtWn = $(recWo).next()[0];
                                            let join = $(amtWn).next()[0];
                                            let left = $(join).next()[0];
                                            //let ar = [season, div, team, endRank, recW, recWo, amtWn, join, left];
                                            if (formatElo > 0) {
                                                formatElo = (formatElo + divToElo(elementText(div)))/2;
                                                formatElo += placementToEloAdj(elementText(endRank));
                                            } else {
                                                formatElo = divToElo(elementText(div));
                                                formatElo += placementToEloAdj(elementText(endRank));
                                            }
                                            if (formatElo > 0 && roundsWith >= 5) {
                                                foundValidSeasons++;
                                            } else {}
                                            tbr = $(tbr).next()[0];
                                        }
                                        if (foundValidSeasons > 0) {
                                            playerElos[format] = {
                                                elo: formatElo,
                                                div: eloToDiv(formatElo)
                                            }
                                        }
                                    }



                                }
                            }
                        }
                    }
                    resolve({
                        _steamId,
                        _discordId,
                        playerName,
                        discordTag,
                        underBan,
                        underProbation,
                        playerElos
                    })
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
    )
}
