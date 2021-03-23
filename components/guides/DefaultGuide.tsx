import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import GuideCard from "./GuideCard";

export function DefaultGuide() {
	return (
		<>
			<div className="text-center pt-5">
				<h1 className="display-1">
					Welcome to Guides+!
				</h1>
				<br/>
				<h4>
					These guides have been created by reputable contributors who have in-depth knowledge about the game.
					<br/>
					To start, check out the featured guides below or expand the guide list on the top left!
				</h4>
				<br/>
				<hr className="w-75 ml-auto mr-auto"/>
				<div className="mt-5">
					<h1>
						Highest Rated
					</h1>
					<MDBRow center>
						<GuideCard/>
						<GuideCard/>
						<GuideCard/>
					</MDBRow>
				</div>
				<div className="mt-5 w-100">
					<h1>
						Recently Added
					</h1>
					<MDBRow center>
						<GuideCard/>
						<GuideCard/>
						<GuideCard/>
						<GuideCard/>
						<GuideCard/>
						<GuideCard/>
					</MDBRow>
				</div>
			</div>
			
		</>
	)
}
export default DefaultGuide
