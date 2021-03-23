import {NavbarTopPage} from "../../components/templates/NavbarTopPage";
import React, {useEffect, useState} from "react";
import {
	MDBBadge,
	MDBBtn,
	MDBBtnGroup,
	MDBCol,
	MDBCollapse,
	MDBContainer, MDBDropdown,
	MDBDropdownItem, MDBDropdownMenu,
	MDBDropdownToggle,
	MDBIcon,
	MDBRow
} from "mdbreact";
import Image from 'next/image'
import ClassQueueCard from "../../components/pug/pug-page/ClassQueueCard/ClassQueueCard";
import PugHeader from "../../components/pug/pug-page/PugHeader";
import PugInfoBar from "../../components/pug/pug-page/PugInfoBar";
import useSocket from "../../hooks/socket/useSocket";
import {PugQueueRole} from "../../models/pugs/PugProfile";

export function PugPage() {
	const [collapsed, setCollapsed] = useState(true);
	
	const [waitingMembers, setWaitingMembers] = useState<{[group: string]: Array<any>}>({});
	
	const [queueBadges, setQueueBadges] = useState<JSX.Element>();
	
	const socket: any = useSocket();
	
	let waitingGroups = [
		"all-class",
		"scout",
		"soldier",
		"pyro",
		"heavy",
		"engineer",
		"medic",
		"sniper",
		"spy"
	]
	
	useEffect(() => {
		if (socket) {
			socket.emit('registerRoom', 'pugPage');
			socket.on('updatePugPageUsers', (users: any) => {
				setWaitingMembers(users["waiting"]);
			})
		}
	})

	let qb = waitingGroups.map(group => {
		return <ClassQueueCard roleName={group as PugQueueRole} queuedPlayers={waitingMembers ? waitingMembers[group] : []} fullWidth={group === "all-class"} key={group}/>
	})
	
	return (
		<NavbarTopPage>
			<MDBContainer fluid>
				<div className="prolander-page pt-3">
					<PugHeader/>
					<MDBRow className="px-2">
						{ qb }
					</MDBRow>
					<hr className="w-50 mx-auto"/>
					<MDBRow around>
						<PugInfoBar/>
					</MDBRow>
				</div>
			</MDBContainer>
		</NavbarTopPage>
	)
}
export default PugPage
