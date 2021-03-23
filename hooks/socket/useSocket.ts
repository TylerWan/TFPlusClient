import {useEffect, useState} from "react";

const io = require("socket.io-client");
export default function useSocket() {
	
	const [socket, setSocket] = useState(null);
	
	useEffect(() => {
		let sock  = (io("http://localhost:8080", {"force new connection" : true,
			"reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
			"timeout" : 10000, transports: ['websocket', 'polling', 'flashsocket']}));

		//socket logic
		
		setSocket(sock);
		
		function cleanup() {
			sock.disconnect();
		}

		return cleanup;

	}, [])
	
	return socket;
}
