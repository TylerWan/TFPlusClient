
import {PlayerProfile} from "../../models/profile/PlayerProfile";

/*

import {SteamProfile} from "../../models/steam/SteamProfileIface";
import {DiscordProfile} from "../../models/discord/DiscordProfile";
import {PugProfile} from "../../models/pugs/PugProfile";
import {localValues} from "../../utils/vals";
import {genId} from "../../utils/bitOps";


/!*
const fs = require('fs');

export function setAccountProfiles(accountProfiles: any, database?: boolean) {
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.siteAccounts, accountProfiles);
    }
    return LocalWrite(DataFiles.Site_Profiles, accountProfiles);
}

export function getSiteAccountProfiles(database?: boolean) {
    return LocalRead(DataFiles.Site_Profiles);
}

export function getSiteAccount(accountId: string, database?: boolean): PlayerProfile {
    let accountsSite = LocalRead(DataFiles.Site_Profiles);
    return toSiteProfile(accountsSite[accountId]);
}

export function setSiteAccount(siteAccount: PlayerProfile, database?: boolean) {
    const actId = siteAccount.getProfileId();
    if (!actId) {
        return false;
    }
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.siteAccounts + "/" + actId, siteAccount);
    }
    let accountsSite = LocalRead(DataFiles.Site_Profiles) || {};
    accountsSite[actId] = siteAccount;
    return LocalWrite(DataFiles.Site_Profiles, accountsSite);
}

export function setSteamProfiles(steamProfiles: any, database?: boolean) {
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.steamAccounts, steamProfiles);
    }
    LocalWrite(DataFiles.Steam_Profiles, steamProfiles);
}

export async function getSteamProfiles(database?: boolean) {
    return LocalRead(DataFiles.Steam_Profiles);
}

export function getSteamAccount(steamid: string, database?: boolean): SteamProfile {
    let steamProfile: SteamProfile = toSteamInterface(LocalRead(DataFiles.Steam_Profiles));
    return steamProfile;
}

export function setSteamAccount(steamAccount: SteamProfile, database?: boolean) {
    if (!steamAccount.steamid) {
        return false;
    }
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.steamAccounts + "/" + steamAccount.steamid, steamAccount);
    }
    let accountsSteam = LocalRead(DataFiles.Steam_Profiles) || {};
    accountsSteam[steamAccount.steamid] = steamAccount;
    return LocalWrite(DataFiles.Steam_Profiles, accountsSteam);
}


export function setDiscordProfiles(discordProfiles: any, database?: boolean) {
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.discordAccounts, discordProfiles);
    }
    return LocalWrite(DataFiles.Discord_Profiles, discordProfiles);
}

export function getDiscordProfiles(database?: boolean) {
    return LocalRead(DataFiles.Discord_Profiles);
}

export function getDiscordAccount(discordid: string,database?: boolean) {
    let accountsDiscord = LocalRead(DataFiles.Discord_Profiles);
    return toDiscordInterface(accountsDiscord[discordid]);
}

export function setDiscordAccount(discordAccount: DiscordProfile, database?: boolean) {
    const discordId: string = discordAccount.discordid;
    if (!discordId) {
        return false;
    }
    if (database) {
        DBWrite(localValues.databaseAbsPaths.userProfiles.discordAccounts + "/" + discordId, discordAccount);
    }
    let accountsDiscord: AccountsDict = LocalRead(DataFiles.Discord_Profiles);
    accountsDiscord[discordId] = discordAccount;
    return LocalWrite(DataFiles.Discord_Profiles, accountsDiscord);
}


export function setPugProfiles(pugProfiles: any, database?: boolean) {

}

export function getPugProfiles(database?: boolean) {

}

export function getPugAccount(pugActId: string, database?: boolean) {

}

export function setPugAccount(pugAccount: PugProfile, database?: boolean) {

}
*!/

export function findAccounts(options: {steamId?: string, discordId?: string, accountId?: string}) {
    if (!options || (!options.accountId && !options.discordId && !options.accountId)) {
        return undefined;
    }

    let accountsSite = LocalRead(DataFiles.Site_Profiles);
    let accountsSteam = LocalRead(DataFiles.Steam_Profiles);
    let accountsDiscord = LocalRead(DataFiles.Discord_Profiles);

    // Account indexes
    let siteAccounts = Object.entries(accountsSite);
    let steamAccounts = Object.entries(accountsSteam);
    let discordAccounts = Object.entries(accountsDiscord);

    // Get profiles
    let siteAccountResults = siteAccounts.filter(([siteProfileId, siteProfile]: any)=>{
        return (!!options.steamId && siteProfile._steamid === options.steamId) ||
            (!!options.discordId && siteProfile._discordId === options.discordId) ||
            (!!options.accountId && siteProfile._profileId === options.accountId) ||
            (siteProfileId === options.accountId);
    });

    let steamAccountResults = steamAccounts.filter(([steamId, steamProfile]: any)=>{
        return (!!steamProfile && !!options.accountId && options.accountId === steamProfile.parentProfileId) ||
            (steamId === options.steamId);
    })

    let discordAccountResults = discordAccounts.filter(([discordId, discordProfile]: any)=>{
        return (!!options.accountId && options.accountId === discordProfile.parentProfileId) ||
            (discordId === options.discordId);
    })

    return {
        siteAccountResults,
        steamAccountResults,
        discordAccountResults
    }

}

function DBWrite(dataPath: string, data: any) {
    let emitter = getEmitter();

    return emitter.emit('DB.WRITE', {
        dataPath,
        data: JSON.parse(JSON.stringify(data))
    }).then((r: any) => {return r})
}
function DBRead(dataPath: string) {
    let emitter = getEmitter();

    return emitter.emit('DB.READ', {
        dataPath
    }).then((r: any) => {return r})
}

function LocalWrite(dataPath: string, data: any) {
    //let writeData = JSON.stringify(data);
    let emitter = getEmitter();
    emitter.emit('DB.WRITE', { dataPath, data })
    //fs.writeFileSync(path, writeData);
}

async function LocalRead (path: string) {
    //let values = fs.readFileSync(path);
    //values = JSON.parse(JSON.stringify(values));
    let emitter = getEmitter();
    emitter.emit('getUserInfo', {})
    return
}


let DataFiles = {
    Site_Profiles: ('/data/SiteProfiles'),
    Steam_Profiles: ('/data/SteamProfiles'),
    Discord_Profiles: ('/data/DiscordProfiles')
}

interface AccountsDict {
    [id: string]: (SteamProfile | PlayerProfile | DiscordProfile)
}

function toSiteProfile(obj: any): PlayerProfile {
    let profileId: string = (typeof obj.getProfileId === "function") ? obj.getProfileId() : genId();
    let siteProfile = new PlayerProfile(profileId)
    if (typeof obj.setSteamId === "function" && typeof obj.getSteam === "function") {
        siteProfile.setSteamId(profileId);
    }
    let discordId: string = (typeof obj.getDiscordId === "function") ? obj.getDiscordId() : "";
    if (typeof obj.setDiscordId === "function" && typeof obj.getDiscordId === "function") {
        siteProfile.setDiscordId(discordId);
    }

    return siteProfile;
}

function toSteamInterface(obj: any): SteamProfile {
    let steamProfile: SteamProfile = <SteamProfile>{};

    steamProfile.lastUpdated = new Date();

    if (typeof obj.steamid === "string") {
        steamProfile.steamid = obj.steamid;
    }
    if (typeof obj.communityvisibilitystate === "string") {
        steamProfile.communityvisibilitystate = obj.communityvisibilitystate;
    }
    if (typeof obj.profilestate === "number") {
        steamProfile.profilestate = obj.profilestate;
    }
    if (typeof obj.personaname === "string") {
        steamProfile.personaname = obj.personaname;
    }
    if (typeof obj.profileurl === "string") {
        steamProfile.profileurl = obj.profileurl;
    }
    if (typeof obj.avatarhash === "string") {
        steamProfile.avatarhash = obj.avatarhash;
    }
    if (typeof obj.fullAvatarUrl === "string") {
        steamProfile.fullAvatarUrl = obj.fullAvatarUrl;
    }
    if (typeof obj.steamConvertible === "object") {
        steamProfile.steamConvertible = obj.steamConvertible;
    }
    if (typeof obj.parentProfileId === "string") {
        steamProfile.parentProfileId = obj.parentProfileId
    }
    return steamProfile;
}


function toDiscordInterface(obj: any): DiscordProfile {
    let discordProfile: DiscordProfile = <DiscordProfile>{};
    if (typeof obj.discordid === "string") {
        discordProfile.discordid = obj.discordid;
    }
    if (typeof obj.username === "string") {
        discordProfile.username = obj.username;
    }
    if (typeof obj.avatar === "string") {
        discordProfile.avatar = obj.avatar;
    }
    if (typeof obj.discriminator === "string") {
        discordProfile.discriminator = obj.discriminator;
    }
    if (typeof obj.verified === "boolean") {
        discordProfile.verified = obj.verified;
    }
    discordProfile.lastUpdated = new Date();
    if (typeof obj.parentProfileId === "string") {
        discordProfile.parentProfileId = obj.parentProfileId;
    }

    return discordProfile;
}

*/
