import {genId} from "../../utils/bitOps";
import {getCookie} from "../../utils/cookies";
import {getSelfInfoFromKey} from "../../utils/accounts/check-in";
import fetch from 'node-fetch'

// @ts-ignore
export function createCommHandler(emitter: Emittery) {
    let accounts: any = {};
    emitter.on('setUserInfo', (datas: any) => {
        console.log('gotgetcomm');
        console.log(datas);
        console.log('tests')
    })
    emitter.on('updateDolphin', (dolph : string) => {
        console.log('got at comm: ' + dolph);
    })
    emitter.on('gimme', (authkey: string)=> {

    })
    function getActs() {
        return accounts;
    }
    emitter.on('updateAccounts', (accts: any) => {
        accounts = accts;
        console.log(accts);
    })
}

const processSelfInfo = (handler: any) => async (req: any, res: any) => {
    // let emitter = require('../handlers/emitObj').getEmitter();
    // console.log('getting shit')
    // let emitKey = genId();
    // let authKey = getCookie(req, res, "tfplusauthkey");
    // console.log('cookie')
    // console.log(authKey)
    // console.log(emitter)
    // emitter.emit('getUserInfo', {emitKey, authKey})
    // emitter.once('callback' + emitKey).then((userInfo: any)=>{
    //     console.log('callback')
    //     let profileScope = {
    //         steamid: userInfo._steamId,
    //         discordId: userInfo._discordId,
    //         userAvatarUrl: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/21/2115aae53f4d4361dd8f9c8042e24399c944e8b7_full.jpg",
    //         username: userInfo.alias
    //     }
    // })
    // console.log('reteretere')
    // let testin = {name: "dolphin", dick: "big"}
    let authKey = getCookie(req, res, "tfplus-authkey");
    if (authKey) {
        return await fetch('http://localhost:8080/api/user/self?authKey=' + authKey).then(async userResponse => {
            return await userResponse.json().then(user=> {
                return handler(req, res, user);
            });

        })
    } else {
        return handler(req, res, {data: 'not here!'});
    }
}

export default processSelfInfo
