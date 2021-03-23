import {ParsedUrlQuery} from "querystring";

export function parseUrl(urlString: string) {
    return new URL(urlString, 'http://w.w');
}

export function urlQueryParams(searchParams: globalThis.URLSearchParams) {
    let query: ParsedUrlQuery = {};
    Object.assign(searchParams, query);
    return query;
}

export function isSteamId(steamId: string) {
    return !!steamId && steamId.length === 17;
}

export function isDiscordId(discordId: string) {
    return !!discordId && discordId.length == 18;
}

export function getCurrentDate() {
    return new Date;
}

export function getSteamAvatarUrl(avatarHash: string) {
    if (!avatarHash) {
        return undefined;
    }
    return {
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/21/' + avatarHash + '.jpg',
        avatarmedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/21/' + avatarHash + '_medium.jpg',
        avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/21/' + avatarHash + '_full.jpg',
    }
}

export function isAppropriateUsername(username: string) {
    let legible = username.replace(/\W/g, '');
    return (!!legible && legible.length >= 2 && legible.length <= 21);
}
