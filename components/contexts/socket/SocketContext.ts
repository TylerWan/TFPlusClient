import { createContext } from "react";

import { SocketIface } from "./SocketIface";

// @ts-ignore
const SocketContext = createContext<SocketIface>(null);

export default SocketContext;
