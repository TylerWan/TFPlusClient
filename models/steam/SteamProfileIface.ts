import SteamID from 'steamid'

export interface SteamProfile {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatarhash: string;
    fullAvatarUrl: string;
    steamConvertible: SteamID;
    lastUpdated: Date;
    parentProfileId: string;
}

