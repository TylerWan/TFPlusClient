import {emitJSON} from "./emitJSON";

import {parseUrl} from "../../utils/parsing";

import {IncomingMessage, ServerResponse} from "http";

export type RequestHandler = (req: IncomingMessage, res: ServerResponse) => boolean;

// @ts-ignore
export function createRequestHandler(): RequestHandler {

    return function (req: IncomingMessage, res: ServerResponse): boolean {
        if (typeof req.url !== "string") {
            return false;
        }

        const parsedUrl = parseUrl(req.url);

        const { searchParams } = parsedUrl;

        if (/^\/api\/dolphin\??.*$/.test(req.url)) {
            let shouldGive:boolean = (searchParams.get('key') === 'dolp');
            emitJSON(
                res,
                {
                    dolphin: shouldGive ? 'dere' : 'naaah bruh'
                }
            )
            return true;
        }

        // get list of rooms
        /*
        if (/^\/api\/rooms\??.*$/.test(req.url)) {
          emitJSON(
            res,
            Object.keys(server.of("/").adapter.rooms)
              .filter(isRoomName)
              .map(getRoomId)
          );
          return true;
        }

        // get list of users
        if (/^\/api\/users(\?.*)?$/.test(req.url)) {
          emitJSON(
            res,
            Object.keys(server.of("/").adapter.rooms)
              .filter(isUserName)
              .map(getUserId)
          );
          return true;
        }

        // get list of users in a room
        let usersInRoom: RegExpExecArray;
        if ((usersInRoom = /^\/api\/users\/in\/(.+)\??.*$/.exec(req.url))) {
          const roomId = usersInRoom[1];
          const rooms = server.of("/").adapter.rooms;
          const room = rooms[getRoomName(roomId)];
          if (!room) {
            emitJSON(res, []);
            return true;
          }
          emitJSON(res, Object.keys(room.sockets));
          return true;
        }
         */
        return false;
    };
}
