import { Reference } from "@firebase/database-types";
import {localValues} from "../../utils/vals";
import {CheckInOptions, checkInUpdateProfiles} from "../../utils/accounts/check-in";
import {genId} from "../../utils/bitOps";
import {getFullSteamAccountApi} from "../../utils/steam/steamAPI";

// @ts-ignore
export function createDatabaseHandler(databaseRef: Reference) {

    let accountInfo = {
        SiteProfiles: <any>{},
        SteamProfiles: <any>{},
        DiscordProfiles: <any>{},
        AuthToProfile: <any>{}
    };


    // Inits
    databaseRef.child(localValues.databaseAbsPaths.userProfiles.siteAccounts).on("value", (r: any) => {
        console.log('emitting', r.val())

        accountInfo.SiteProfiles = r.val()
    })
    databaseRef.child(localValues.databaseAbsPaths.userProfiles.steamAccounts).on("value", (r: any) => {
        accountInfo.SteamProfiles = r.val();
    })
    databaseRef.child(localValues.databaseAbsPaths.userProfiles.discordAccounts).on("value", (r: any) => {
        accountInfo.DiscordProfiles = r.val();
    })
    databaseRef.child(localValues.databaseAbsPaths.userProfiles.authToId).on("value", (r: any) => {
        accountInfo.AuthToProfile = r.val();
    })

    databaseRef.child('test/').on("value",(r: any)=> {
        console.log('newtest:::' + r.val());
    });

    // emitter.on("DB.WRITE", (datas: any) => {
    //     const { path, data } = datas;
    //     console.log('req write')
    //     console.log(datas);
    //     return writeData(path, data).then((r: any) => {return r});
    // });
    //
    // emitter.on("DB.READ", (data: any) => {
    //     const { dataPath, value } = data;
    //     return readPathData(dataPath).then((r: any) => {return r});
    // });

    // emitter.on('getUserInfo', (data: any)=> {
    //     const { emitKey, authKey } = data;
    //     console.log('getuser')
    //     return emitter.emit('callback' + emitKey, (getSiteAccounts() ? getSiteAccounts()[accountInfo.AuthToProfile[authKey]]: {}));
    // })
    //
    // emitter.on('check-in', async ({method, userJson, authKey}: any) => {
    //
    //     console.log('got auth')
    //     console.log(authKey)
    //     let siteId = "";
    //     let discordNewProfile;
    //     let steamNewProfile;
    //     let steamId;
    //     let backupId = genId();
    //     let accountProfile;
    //     let discordId;
    //     switch (method){
    //         case "steam": {
    //             accountProfile = getAccountFromSteam(userJson?.steamid)
    //             siteId = accountProfile?.profileId
    //             steamId = userJson?.steamid;
    //         }break;
    //         case "discord": {
    //             accountProfile = getAccountFromDiscord(userJson?.id)
    //             siteId = accountProfile?.profileId
    //             discordId = userJson?.id
    //             discordNewProfile = {
    //                 discordid: userJson?.id,
    //                 username: userJson?.username,
    //                 avatar: userJson?.avatar,
    //                 discriminator: userJson?.discriminator,
    //                 verified: userJson?.verified,
    //                 lastUpdated: new Date,
    //                 parentProfileId: (siteId && siteId.length > 10) ? siteId : backupId
    //             }
    //         }
    //     }
    //
    //     if (!steamId) {
    //         steamId = accountProfile ? accountProfile.steamId : ""
    //     }
    //     await getFullSteamAccountApi(steamId).then(steamProfile => {
    //         steamNewProfile = steamProfile;
    //         steamNewProfile.parentProfileId = siteId;
    //         console.log('steamNewProfilepre');console.log(steamNewProfile);
    //     });
    //     console.log('steamNewProfile');
    //     console.log(steamNewProfile);
    //     if (!discordId) {
    //         discordId = accountProfile ? accountProfile.discordId : "";
    //     }
    //     if (getSiteAccounts() && getSiteAccounts()[siteId]) {
    //         accountProfile = getSiteAccounts()[siteId];
    //     }
    //     setAuthToProfile(authKey, ((siteId && siteId.length > 10) ? siteId : backupId));
    //
    // })

    function writeData(path: string, value: any) {
        if (value === undefined) {
            value = null;
        }
        console.log('writing @ '+path)
        console.log(value)
        return databaseRef.child(path).set(value).then((r: any) => {return r});
    }

    async function readPathData(path: string, rawVal?: boolean) {
        return databaseRef.child(path).once("value").then((data) => {return rawVal? data: data.val()})
    }

    function readAccountsData(accountType: string) {
        if (accountType === '/data/SiteProfiles') {
            return getSiteAccounts();
        }
        if (accountType === '/data/SteamProfiles') {
            return getSteamAccounts();
        }
        if (accountType === '/data/DiscordProfiles') {
            return getDiscordAccounts();
        }
    }


    function getSiteAccounts() {
        return accountInfo.SiteProfiles;
    }

    function getSteamAccounts() {
        return accountInfo.SteamProfiles;
    }

    function getDiscordAccounts() {
        return accountInfo.DiscordProfiles;
    }

    function getAuthToProfile(authKey: string) {
        return accountInfo.AuthToProfile[authKey];
    }

    function setAuthToProfile(authKey: string, profileId: string) {
        writeData(localValues.databaseAbsPaths.userProfiles.authToId + authKey, profileId);
        return accountInfo.AuthToProfile[authKey] = profileId;
    }

    function getAccountFromSteam(steamid: string) {
        if (!getSteamAccounts() || !getSiteAccounts()) {
            return undefined;
        }
        let steamAccount = getSteamAccounts()[steamid]
        return getSiteAccounts()[steamAccount?.parentProfileId];
    }

    function getAccountFromDiscord(discordid: string) {
        if (!getDiscordAccounts() || !getSiteAccounts()) {
            return undefined;
        }
        let discordAccount = getDiscordAccounts()[discordid]
        return getSiteAccounts()[discordAccount?.parentProfileId];
    }

}
