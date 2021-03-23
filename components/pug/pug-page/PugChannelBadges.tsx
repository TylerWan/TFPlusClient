import React, { useEffect, useState } from "react";
import useSocket from "../../../hooks/socket/useSocket";
import PlayerQueueBadge from "./ClassQueueCard/PlayerQueueBadge";
import usePugChannel from "../../../hooks/pugs/usePugChannels";

interface pugChannelBadgesProps {
	badgeGroup: string,
	channelMembers: Array<any>
}
export default function PugChannelBadges(props: pugChannelBadgesProps) {

	let channelElements: JSX.Element[] | JSX.Element;
	channelElements = <>{props.channelMembers?.length > 0 ? props.channelMembers.map(player=>{
		return <PlayerQueueBadge username={player.username} avatarUrl={player.avatarUrl} key={player.discordId} userInfo={player.userInfo}/>
	}) : <></>}</>
	
	
	return channelElements
}
