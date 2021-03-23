import {
	MDBCollapse,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle, MDBIcon,
} from 'mdbreact';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import React, {useState} from "react";
interface PBadgeProps {
	username: string,
	avatarUrl: string,
	inPugDraft?: boolean,
	userInfo?: any
}
export default function PlayerQueueBadge(props: PBadgeProps) {
	const [visModal, setVisModal] = useState(false);
	
	function toggleModal() {
		setVisModal(!visModal);
	}

/*
	let pugPlayerDrop = (
		<MDBDropdown dropright>
			<MDBDropdownToggle caret className="w-100 m-0 badge-dropdown-item px-4" tag="div">
				hey its pugs
			</MDBDropdownToggle>
			<MDBDropdownMenu basic>
				<MDBDropdownItem>Switch Team</MDBDropdownItem>
				<MDBDropdownItem>Remove</MDBDropdownItem>
			</MDBDropdownMenu>
		</MDBDropdown>
	)
	
	let pugDraftDrop = (
		<>
			<MDBDropdown dropright>
				<MDBDropdownToggle caret className="w-100 m-0 badge-dropdown-item px-4" tag="div">
					Team Draft
				</MDBDropdownToggle>
				<MDBDropdownMenu basic>
					<MDBDropdownItem>Switch Team</MDBDropdownItem>
					<hr className="w-75 m-auto"/>
					<MDBDropdownItem>Remove</MDBDropdownItem>
				</MDBDropdownMenu>
			</MDBDropdown>
			<hr className=" m-auto"/>
		</>
	);
	*/
	return (
		<>
			<MDBBtn outline className="b-container-10 pr-2 m-1 player-badge p-0" onClick={toggleModal}>
				<div className="cell1">
					<div className="wrap-ellipse pr-2">
						<img
							src={props.avatarUrl}
							className="pp-img img-fluid pr-1"
						/>
						<span>
						{props.username}
				</span>
					</div>
				</div>
			</MDBBtn>
			<MDBModal isOpen={visModal} toggle={toggleModal} cascading className="modal-avatar" inline={false} noClickableBodyWithoutBackdrop={false} overflowScroll={true}>
				<MDBModalHeader>
					<img
						src={props.avatarUrl}
						className="img-fluid pr-1 badge-info-img bg-dark img-responsive"
					/>
					
				</MDBModalHeader>
				<MDBModalBody className="text-center mt-0 pt-0">
					<h1 className="overflow-auto">
						{props.username}
					</h1>
					<div>
					</div>
				</MDBModalBody>
				<MDBModalFooter className="justify-content-center">
					<MDBBtn color="danger" onClick={toggleModal}>Cancel</MDBBtn>
					<MDBBtn color="primary" onClick={toggleModal}>Save changes</MDBBtn>
				</MDBModalFooter>
			</MDBModal>
		</>

	
	)
}
