export class ExternalApiClient {
    protected type = ClientType.Generic_Api_Client;
    private alias: string;
    protected hasInit = false;
    constructor(clientAlias: string) {
        this.alias = clientAlias;
    }

    public getAlias() {
        return this.alias;
    }

    public setAlias(clientAlias: string) {
        this.alias = clientAlias;
    }

    public getType() {
        return this.type;
    }

}
const Discord = require('discord.js');
export class DiscordClient extends ExternalApiClient {
    protected type = ClientType.Discord_Client;
    private _key: string | undefined;
    private readonly _client: any | undefined;

    constructor(clientAlias: string, key: string) {
        super(clientAlias);
        this._client = new Discord.Client();
        this._key = key;
    }


    public setKey(key: string) {
        this._key = key;
    }

    public getKey() {
        return this._key;
    }

    private login(key?: string) {
        if (!this._client || !key) {
            throw new Error('No valid key or client');
        } else {
            return this._client.login(key).then((r: any) => {
                return r;
            });
        }
    }

    public connect(key?: string) {
        if (!key && !!this._key) {
            key = this._key;
        }
        if (key) {
            return this.login(key);
        }
        return new Error('Cannot connect without valid key string');
    }

    public getClient() {
        return this._client;
    }


}



export class FirebaseClient extends ExternalApiClient {
    private admin = require('firebase-admin');
    protected type = ClientType.Firebase_Client;
    constructor(clientAlias: string, serviceAccount: any) {
        super(clientAlias);
        if (this.admin) {
            this.admin.initializeApp({
                credential: this.admin.credential.cert(serviceAccount),
            });

        }

    }
    public getAdmin() {
        return this.admin;
    }

}

export enum ClientType {
    Generic_Api_Client,
    Discord_Client,
    Firebase_Client
}
