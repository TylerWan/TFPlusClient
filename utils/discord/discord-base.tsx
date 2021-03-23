import { DiscordClient } from "models/clients/Client";

const Discord = require('discord.js');
const client = new Discord.Client();

export default class DiscordBase {
    private readonly _discordClient: DiscordClient;
    constructor(alias: string, key: string) {
        this._discordClient = new DiscordClient(alias, key);
        this._discordClient.getClient().on('ready', () => {
            console.log("Connected to Discord as " + client.user.tag);
            //client.users.cache.find((user: { id: string; }) => user.id = '111648580237815808')
        });
    }

    public getClient() {
        return this._discordClient;
    }

}

