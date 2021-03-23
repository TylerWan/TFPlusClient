export let localValues = {
    databaseAbsPaths: {
        userProfiles: {
            root: 'data/userProfiles/',
            siteAccounts: 'data/userProfiles/siteAccounts/',
            steamAccounts: 'data/userProfiles/steamAccounts/',
            discordAccounts: 'data/userProfiles/discordAccounts/',
            authToId: 'data/userProfiles/authToSiteId/',
        }
    },
    cookieNames: {
        authKey: 'tfplus-authkey'
    }
}

export function divToElo (divName: string) {
    divName = divName.toLowerCase();
    if (divName.includes('newcomer')) {
        return 500;
    }
    if (divName.includes('amateur')) {
        return 700;
    }
    if (divName.includes('intermediate') || divName.includes('im')) {
        return 1000;
    }
    if (divName.includes('main')) {
        return 1200;
    }
    if (divName.includes('div-2')) {
        return 1400;
    }
    if (divName.includes('advanced')) {
        return 1500;
    }
    if (divName.includes('div-1')) {
        return 1600;
    }
    if (divName.includes('invite')) {
        return 1900;
    }
    return -1;

}

export let divisions = [
    'newcomer',
    'amateur',
    'intermediate',
    'main',
    'div-2',
    'advanced',
    'div-1',
    'challenger',
    'invite'
]

export function placementToEloAdj(place: any) {
    if (typeof place === 'string') {
        let pl = place.split('/');
        if (pl.length !== 2 || parseInt(pl[1]) === 0) {
            return 0;
        }
        pl[0] = pl[0].trim();
        pl[1] = pl[1].trim();
        place = parseInt(pl[0])/parseInt(pl[1]);
        if (place === undefined) {
            return 0;
        }
    }
    if (place <= 0.3) {
        return 100;
    }
    if (place <= 0.6) {
        return 0;
    }
    if (place >= 0.8) {
        return -100;
    }
    return 0;
}

export function eloToDiv(elo: number) {
    if (elo <= 700) {
        return 'Newcomer/Amateur';
    }
    if (elo <= 900) {
        return 'Amateur/IM';
    }
    if (elo <= 1100) {
        return 'IM';
    }
    if (elo <= 1300) {
        return 'Main';
    }
    if (elo <= 1700) {
        return 'Advanced/Challenger';
    }
    if (elo > 1700) {
        return 'Invite';
    }
}
