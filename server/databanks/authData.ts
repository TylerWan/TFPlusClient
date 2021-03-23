import {genId} from "../../utils/bitOps";

let _authKeyToProfile: {[authKey: string]: string} = {};
let _profileToAuthKeys: {[profileId: string]: Array<string>} = {};

const fs = require('fs');
export function authKeyToProfileId(authKey: string) {
    return LocalRead().keyToProfile[authKey];
}

export function profileIdToAuthKeys(profileId: string) {
    return LocalRead().ProfileToKey[profileId];
}

export function setAuthKey(authKey: string, profileId: string) {
    let existing = LocalRead();
    existing = ((existing.keyToProfile && existing.profileToKey) ? existing : {
        keyToProfile: {
            [authKey]: profileId
        },
        profileToKey: {
            [profileId]: authKey
        }
    })
    
    LocalWrite(existing.keyToProfile[authKey]);
    existing.profileToKey[profileId] = authKey;
    LocalWrite(existing);
}

export function createKeyPair(profileId: string) {
    let authKey = genId();
    setAuthKey(authKey, profileId);
    return authKey;
}


async function LocalWrite(data: any) {
    fs.writeFileSync(DataFiles.Auth_Path, JSON.stringify(data));
}

function LocalRead() {
    return JSON.parse(fs.readFileSync(DataFiles.Auth_Path));
}

let DataFiles = {
    Auth_Path: (__dirname + '/data/AuthKeys.json').replace('\/\/', ''),
}
