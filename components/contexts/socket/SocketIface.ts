import { Socket } from "socket.io-client";


export interface SocketIface {
  readonly socket: typeof Socket;
}
