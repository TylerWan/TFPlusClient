export interface PugProfile {
    steamId: string,
    discordId: string,
    pugProfileId: string,
    pugs: Array<object>,
    pugIdHistory: Array<string>,
    eloProfile: EloProfile,
    parentProfileId: string
}

interface EloProfile {
    sixesElos: SixesElos,
    hlElos: AllClassElos
}

interface SixesElos {
    scout: ClassElo,
    roamer: ClassElo,
    pocket: ClassElo,
    demoman: ClassElo,
    medic: ClassElo
}

interface AllClassElos {
    scout: ClassElo,
    soldier: ClassElo,
    pyro: ClassElo,
    demoman: ClassElo,
    heavy: ClassElo,
    engineer: ClassElo,
    medic: ClassElo,
    sniper: ClassElo,
    spy: ClassElo
}

interface ClassElo {
    secondsPlayed: number;
    eloVal: number;
    properties: object;
}

export type PugQueueRole = "scout" | "soldier" | "pyro" | "demoman" | "heavy" | "engineer" | "medic" | "sniper" | "spy" | "all-class";
