export interface DiscordProfile {
    discordid: string;
    username: string;
    avatar: string;
    discriminator: string;
    verified: boolean;
    lastUpdated: Date;
    parentProfileId: string;
}

