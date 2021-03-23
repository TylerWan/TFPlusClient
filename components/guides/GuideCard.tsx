import {MDBBadge, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import React from "react";

export function GuideCard(props: any) {
	return (
		<>
					<MDBCol className="g-card text-center z-depth-2 col-3">
						<div className="g-card-title">
							<h3 className="">
								Recording In-game demos
							</h3>
						</div>
						<div>
							<p>
								card description to describe the guide
							</p>
						</div>
						<div>
							<MDBBadge pill color="green" className="g-thumbs">
								<MDBIcon icon="thumbs-up" />{" "}
								5
							</MDBBadge>
						</div>
					</MDBCol>
		</>
	)
}

export default GuideCard
