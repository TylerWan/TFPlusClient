import SteamID from "steamid";
import {SteamProfile} from "../models/steam/SteamProfileIface";
import {CheckInOptions, checkInUpdateProfiles} from "../utils/accounts/check-in";
import {genId} from "../utils/bitOps";
import {createKeyPair} from "./databanks/authData";
import {setCookie} from "../utils/cookies";
import {localValues} from "../utils/vals";
import {DiscordProfile} from "../models/discord/DiscordProfile";
import {getSteamAvatarUrl} from "../utils/parsing";

const passport = require("passport");

export default function handleRouting(server: any, nextApp: any, handle: any) {

    //let emitter = require('./handlers/emitObj').getEmitter();

    server.get('/auth/steam',
        passport.authenticate('steam', { failureRedirect: '/' }),
        function(req: any, res: any) {
            res.redirect('/login');
        });

    server.get('/auth/steam/callback',
        // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
        function(req: any, res: any, next: any) {
            req.url = req.originalUrl;
            next();
        },
        passport.authenticate('steam', { failureRedirect: '/login' }),
        function(req: any, res: any) {

            const userJson = req["user"]._json;
            console.log(req.user)

            let authKey = genId();

            console.log('authkey')
            console.log(authKey)

            checkInUpdateProfiles({
                steamId: userJson["steamid"],
                authKey
            }).then(r => {
                setAuthKeyCookie(req, res, authKey).then(() => {
                    res.redirect('/login');
                });
            })

/*            let method = "steam";

            emitter.emit('check-in', {method, userJson, authKey}).then(()=>{
                setAuthKeyCookie(req, res, authKey).then(() => {
                    res.redirect('/login');
                });
            })*/

            /*console.log(userJson);

            const steamId = userJson["steamid"];

            const siteAccounts = findAccounts({
                steamId
            })?.siteAccountResults;

            let siteAccountId: string;
            if (!!siteAccounts && siteAccounts.length > 0 && siteAccounts[0] && siteAccounts[0][0].length > 10) {
                siteAccountId = siteAccounts[0][0];
            } else {
                siteAccountId = genId();
            }


            let steamNewProfile: SteamProfile = {
                steamid: userJson.steamid,
                communityvisibilitystate: userJson.communityvisibilitystate,
                profilestate: userJson.profilestate,
                personaname: userJson.personaname,
                profileurl: userJson.profileurl,
                avatarhash: userJson.avatarhash,
                fullAvatarUrl: getSteamAvatarUrl(userJson.avatarhash)?.avatarfull || "",
                steamConvertible: new SteamID(userJson.steamid),
                lastUpdated: new Date,
                parentProfileId: siteAccountId
            };

            let checkInOptions: CheckInOptions = {
                steamId: steamNewProfile.steamid,
                steamProfile: steamNewProfile,
                profileId: undefined,
                siteProfile: undefined,
                discordId: undefined,
                discordProfile: undefined,
                backUpProfileId: siteAccountId
            }

            checkIn(checkInOptions).then(([profileId, authKey])=>{
                setAuthKeyCookie(req, res, authKey).then(() => {
                    res.redirect('/login');
                });
            });*/

        });
    server.get('/auth/discord', passport.authenticate('discord', { scope: ['identify'] }), function(req:any, res:any) {});

    server.get('/auth/discord/callback',
        passport.authenticate('discord', { failureRedirect: '/' }),
        function(req: any, res: any) {
            const userJson = req.user;

            let authKey = genId();

            console.log('authkey')
            console.log(authKey)
            checkInUpdateProfiles({
                discordId: userJson.id,
                authKey
            }).then(r => {
                setAuthKeyCookie(req, res, authKey).then(() => {
                    res.redirect('/login');
                });
            })
        }
    );

    server.get('/logout',
        function(req: any, res: any, next: any) {
            res.clearCookie(localValues.cookieNames.authKey);
            req.logout();
            res.redirect('/');
        })

    server.get('/a', (req: any, res: any) => {
        return nextApp.render(req, res, '/b', req.query)
    })

    server.get('/b', (req: any, res: any) => {
        return nextApp.render(req, res, '/b', req.query)
    })

    server.all('*', (req: any, res: any) => {
        return handle(req, res);
    })

}



async function setAuthKeyCookie(req: any, res: any, authKey: string) {
    setCookie(req, res, localValues.cookieNames.authKey, authKey);
}
