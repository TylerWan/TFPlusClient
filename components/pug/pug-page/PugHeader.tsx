import {
	MDBBadge,
	MDBBtn,
	MDBBtnGroup,
	MDBCol,
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu, MDBDropdownToggle, MDBIcon,
	MDBRow
} from "mdbreact";
import React, {useEffect} from "react";
import PlayerQueueBadge from "./ClassQueueCard/PlayerQueueBadge";
import usePugChannel from "../../../hooks/pugs/usePugChannels";
export default function PugHeader() {
/*	const { channels, isLoading } = usePugChannel();
	
	let waitingPlayers = [];
	let waitingBadges: JSX.Element[] | JSX.Element = <></>
	if (!isLoading && channels && channels.length >= 1) {
		for (const channel in channels) {
			if (channels.hasOwnProperty(channel) && channels[channel].channelType === "Waiting") {
				let channelUsers = channels[channel].users;
				if (channelUsers && Object.keys(channelUsers).length > 0) {
					for (const userId in channelUsers) if (channelUsers.hasOwnProperty(userId)) {
						let user = channelUsers[userId];
						console.log(user)
						waitingPlayers.push({
							username: user.tag || user.username || user.discriminator || "Unknown",
							avatarUrl: user.avatarURL || user.displayAvatarURL || user.defaultAvatarURL || "",
							discordId: userId || user.id || user.tag || user.username || "Unknown"
						})
					}
				}
			}
		}
		
		waitingBadges = waitingPlayers.map(player=>{
			return <PlayerQueueBadge username={player.username} avatarUrl={player.avatarUrl} key={player.discordId}/>
		}) || <></>
	} else {
		waitingBadges = <h1>loading...</h1>
	}*/
	return (
		<>
			<MDBContainer fluid className="pug-header">
				<MDBRow center className="h-100">
					<MDBCol className="text-center h-100 col-12">
						<div className="d-flex flex-nowrap bd-highlight">
						
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>

	)
}
