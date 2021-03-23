import {CustomFirestoreDatabase, IdType} from "../database/FirestoreDatabase";

export async function checkInUpdateProfiles(options: any) {


    console.log('checking in');
    console.log(options);

    let profileTemplate: any = {};

    let profileId = options?.profileId;
    if (options?.steamId) {
        profileTemplate.steamid = options.steamId;
    }
    if (options?.discordId) {
        profileTemplate.discordid = options.discordId;
    }
    if (options?.authKey) {
        profileTemplate.authkey = options.authKey
    }

    //const firestoreDB = new CustomFirestoreDatabase();
    //firestoreDB.savePlayer(profileTemplate, profileId)

/*    await getLatestRGL(steamId, discordId).then((rglProfile) => {
        if (!!rglProfile && !!siteAccount) {
            siteAccount.setRGLAccount(rglProfile);
        }
    });*/
}

export function getSelfInfoFromKey(authkey: string) {
    const firestoreDB = new CustomFirestoreDatabase();
    console.log('actself')
    let resp = firestoreDB.getAccount(IdType.AUTH_KEY, authkey);
    console.log(resp);
    return resp;
}

export interface CheckInOptions {
    steamId: string | undefined,
    discordId: string | undefined,
    profileId: string | undefined,
    authKey: string | undefined
}

