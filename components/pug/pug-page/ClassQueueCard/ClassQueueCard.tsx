import {
	MDBBadge,
	MDBBtn,
	MDBBtnGroup,
	MDBCol,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle, MDBNav, MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink,
	MDBRow, MDBWaves
} from "mdbreact";
import React from "react";
import QueueCardHeader from "./QueueCardHeader";
import PlayerQueueBadge from "./PlayerQueueBadge";
import PugChannelBadges from "../PugChannelBadges";
import {PugQueueRole} from "../../../../models/pugs/PugProfile";

interface QueueCardProps {
	roleName: PugQueueRole,
	fullWidth?: boolean,
	queuedPlayers: Array<any>
}

export default function ClassQueueCard(props: QueueCardProps) {

	return (
		<MDBCol className={"col class-col text-center m-1" + " " + (props.fullWidth ? "col-12" : "")}>
			<QueueCardHeader roleName={props.roleName}/>
			<div className="d-flex flex-wrap justify-content-center class-queue-card-pool">
				<PugChannelBadges badgeGroup={props.roleName} channelMembers={props.queuedPlayers}/>
			</div>
		</MDBCol>
	)
}
