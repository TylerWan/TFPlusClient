import {
	MDBBtn,
	MDBCol,
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBIcon,
	MDBRow
} from "mdbreact";
import React from "react";
import PlayerQueueBadge from "./ClassQueueCard/PlayerQueueBadge";
import ClassEmblem from "../../icons/ClassEmblem";

export default function PugInfoBar() {
	return (
		<>
			
			<MDBCol className="col-auto">
				<MDBRow className="m-3 cp-r z-depth-2 d-flex justify-content-center">
					<MDBCol className="col-12 p-0">
						<img
							src="https://wiki.teamfortress.com/w/images/thumb/9/92/Engineer_Update_Upward.png/300px-Engineer_Update_Upward.png"
							className="p-map-img w-100 mb-1"
						/>
						<MDBRow around className="pt-1">
							<MDBCol className="text-center col-auto">
								<p>
									<MDBIcon icon="stopwatch" /> 13:23
								</p>
							</MDBCol>
							<MDBCol className="text-center col-auto">
								<p>
									<MDBIcon icon="running" /> DolphiN
								</p>
							</MDBCol>
						</MDBRow>
						<MDBRow around>
							<MDBCol className="col-auto">
								<MDBDropdown>
									<MDBDropdownToggle caret color="primary">
										Resend Teams...
									</MDBDropdownToggle>
									<MDBDropdownMenu basic>
										<MDBDropdownItem>Connect Info</MDBDropdownItem>
										<MDBDropdownItem>Team Channels</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBCol>
							<MDBCol className="col-auto">
								<MDBDropdown>
									<MDBDropdownToggle caret color="primary">
										Move Channels
									</MDBDropdownToggle>
									<MDBDropdownMenu basic>
										<MDBDropdownItem>Red/Blu <MDBIcon icon="angle-right" /> Building</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							</MDBCol>
						</MDBRow>
						<div>
							<MDBRow center className="pt-1">
								<MDBCol className="text-center col-auto">

								</MDBCol>
								<MDBCol className="text-center col-auto p-0 d-flex justify-content-center align-items-center">
								</MDBCol>
								<MDBCol className="text-center col-auto">

								</MDBCol>
							</MDBRow>
						</div>
						<div>
							<MDBRow center className="pt-1">
								<MDBCol className="text-center col-5">

								</MDBCol>
								<MDBCol className="text-center col-auto p-0 d-flex justify-content-center align-items-center">
								</MDBCol>
								<MDBCol className="text-center col-5">

								</MDBCol>
							</MDBRow>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBCol>
		</>
	
	)
}
