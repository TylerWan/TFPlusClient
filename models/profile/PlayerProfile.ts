
/*export class oldPlayerProfile {

    steamid= "";
    discordid = "";
    discordavatar = "";
    username = "unknown_name";
    steamavatarhash = "";
    avatarurl = "";
    authkeys = new Array<string>();


    public setDiscordId(discord: string) {
        this._discordId = discord;
    }

    public getDiscord() {
        return this._discordId;
    }

    public getDiscordId() {
        return this._discordId;
    }

    public setProfileId(id: string) {
        this._profileId = id;
    }

    public genProfileId() {
        this._profileId = genId();
    }

    public getProfileId() {
        return this._profileId;
    }
    
    public setPugId(id: string) {
        this._pugId = id;
    }

    public genPugId() {
        this._pugId = genId();
    }

    public getPugId() {
        return this._pugId;
    }


}

enum AvatarSize {
    SMALL ="",
    MEDIUM = "_medium",
    FULL = "_full"
}
*/

export interface PlayerProfile {
    authkeys?: Array<string> | undefined,
    avatarurl?: string | undefined,
    discordavatar?: string | undefined,
    discordid?: string | undefined,
    steamavatarhash?: string | undefined,
    steamid?: string | undefined,
    username?: string | undefined,
    lastread?: Date | undefined
}
