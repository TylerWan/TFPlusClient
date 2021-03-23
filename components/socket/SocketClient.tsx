import React, { useEffect, useState } from "react";
import useSocket from "../../hooks/socket/useSocket";

interface socketClientProps {
	page?: string
}
export default function SocketClient(props: socketClientProps) {
	
	const socket:any = useSocket();
	useEffect(() => {
		function handleEvent(payload: any) {
			console.log(payload)
			// HelloWorld
		}
		console.log('wut')
		if (socket) {
			console.log('emittt')
			socket.emit('hay', 'betchhh')
			socket.on('SOME_EVENT', handleEvent)
		}
	}, [socket])
	
	return (
		<></>
	);
}
