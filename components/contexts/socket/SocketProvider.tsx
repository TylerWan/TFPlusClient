import { FC, useState, useEffect } from "react";
import { Socket } from "socket.io-client";


import SocketContext from "./SocketContext";
import { SocketIface } from "./SocketIface";


const SocketProvider: FC = ({ children }) => {
  // @ts-ignore
  const [socket, setSocket] = useState<typeof Socket>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    console.log("[socket mounted]");

    // connect to Socket.io server
    const s = io();
    setSocket(s);


    return () => {
      console.log("[unmounted]");
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    /**
     * connection lost
     */
    function disconnect() {
      console.log("[received] disconnect");
      // @ts-ignore
      setSocket(null);

      socket.once("reconnect", () => {
        console.log("[reconnected]");
        setSocket(socket);
      });
    }

    function sayhay() {
      console.log('haayyy');
    }


    socket.on("disconnect", disconnect);
    socket.on("callback", sayhay);

    return () => {
    };
  }, [socket]);




  const data: SocketIface = Object.freeze({
    socket,

  });

  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
