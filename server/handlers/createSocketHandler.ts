import { Server, Socket } from "socket.io";
import Emittery from "emittery";

let sockets = Array<Socket>();

// @ts-ignore
export function createSocketHandler(server: Server, emitter: Emittery) {

    let locals = {};

    // For each socket/connection
    return function socketHandler(socket: any) {
        console.log('new socket')
        socket.on('getUserInfo', (datas: any) => {
            console.log('got it!')
            console.log(datas);
        })
    };
}
