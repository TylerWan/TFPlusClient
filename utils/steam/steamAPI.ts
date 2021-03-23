import {SteamProfile} from "models/steam/SteamProfileIface";
import SteamID from "steamid";

export function getAccountSteamAPI(searchId: string){
    let apiUrl = getPlayerSummaryURL(searchId);
    console.log(searchId)
    return fetch(apiUrl).then(steamResponse => {
        console.log(getPlayerSummaryURL(searchId))
        const data = steamResponse.json();
        return data.then(resp=> {
            console.log(resp)
            if (!resp) {
                return false;
            }

            return resp["response"]["players"][0];
        })

    });


}


export async function getFullSteamAccountApi(searchId: string) {
    let data = getAccountSteamAPI(searchId);
    return data.then(data => {
        return {
            steamid: data?.steamid,
            communityvisibilitystate: data?.communityvisibilitystate,
            profilestate: data?.profilestate,
            personaname: data?.personaname,
            profileurl: data?.profileurl,
            avatarhash: data?.avatarhash,
            fullAvatarUrl: data?.avatarfull,
            steamConvertible: new SteamID(data?.steamid),
            lastUpdated: new Date(),
            parentProfileId: ""
        };
    })

}

function getPlayerSummaryURL(steamId: string) {
    let steamAPIKey = "B232601FCB8754E2844A33F4B6CAFBBC";
    return `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${ steamAPIKey }` +
        `&steamids=${ steamId }&format=json`

}

function isValidProfileReply(data: validReply) {
    return data?.response?.players?.length > 0;
}

interface validReply {
    response: validResponse;
}
interface validResponse {
    players: Array<SteamProfile>;
}
