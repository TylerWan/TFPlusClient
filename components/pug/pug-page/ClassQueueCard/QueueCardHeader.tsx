import {MDBBtn, MDBCol, MDBRow, MDBWaves} from "mdbreact";
import React, {useState} from "react";

interface CardHeaderProps {
	roleName: "scout" | "soldier" | "pyro" | "demoman" | "heavy" | "engineer" | "medic" | "sniper" | "spy" | "all-class"
}

export default function QueueCardHeader(props: CardHeaderProps) {
	const [iconQ, setIconQ] = useState({});
	
	function handleClick(e:any) {
		e.stopPropagation();
		// Waves - Get Cursor Position
		setIconQ({
			top: e.clientY,
			left: e.clientX,
			time: Date.now() // time indicates particular clicks
		});
	}
	return (
		<>
			<MDBRow>
				<MDBCol className="p-0">
					<div className={'pug-class bg-' + props.roleName || 'saxton' + ' d-flex align-items-center justify-content-center z-depth-1'}
					     onMouseUp={handleClick}
					     onTouchStart={handleClick}>
						<MDBWaves
							cursorPos={iconQ as any}
						/>
					</div>
				</MDBCol>
			</MDBRow>{/*
			<MDBRow className="bg-light">
				<MDBCol className="p-0 d-flex align-items-center justify-content-center">
					<MDBBtn className="h-100 m-0 n-r w-100" color="info">
						Set as preferred class
					</MDBBtn>
				</MDBCol>
			</MDBRow>*/}
		</>

	)
}
