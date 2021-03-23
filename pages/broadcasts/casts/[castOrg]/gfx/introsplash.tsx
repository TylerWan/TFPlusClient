import React from "react";
import {ProdGFX} from "../../../../../components/templates/ProdGFX";
import {MDBCol, MDBRow} from "mdbreact";
// @ts-ignore
import { Textfit } from 'react-textfit';
import Marquee from "react-fast-marquee";
export default function IntroSplash() {
	return (
		<ProdGFX>
			{/*			<div className="s-lb">
				<MDBRow className="px-2 bg-rgl text-white z-depth-2">
					<MDBCol>
						Invite 6v6 season 5 Week 8
					</MDBCol>
				</MDBRow>
				<MDBRow className="px-2 bg-white text-black z-depth-2">
					<MDBCol>
						This team comes into this match being the ultimate favorite!!!
					</MDBCol>
				</MDBRow>
			</div>*/}
			
			<div className="s-t-w">
				<Textfit
					mode="single"
					forceSingleModeWidth={false}
					className="s-t">
					Invite 6s S5 W5B: Froyotech vs Ascent!
				</Textfit>
			</div>
			<div className="s-s-w">
				<Marquee
					gradientColor={"[53,80,112]"}
					gradientWidth={"0"}
				>
					<Textfit
						mode="single"
						forceSingleModeWidth={false}
						className="s-s-t">
						START!!!This week is the final week before playoffs! Tune in bitches!playoffs! Tune in bitches!
					</Textfit>
				</Marquee>

			</div>
		</ProdGFX>
	)
}
//timer, song, title, descriptions, match up, rgl logo
