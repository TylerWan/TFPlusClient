import {NavbarTopPage} from "../../components/templates/NavbarTopPage";
import React, {useState} from "react";
import {MDBBtn, MDBCollapse, MDBContainer } from "mdbreact";
import GuideMenuItem from "../../components/guides/GuideMenuItem";
import DefaultGuide from "../../components/guides/DefaultGuide";

export function GuidesHome(props: any){
	const [expanded, setExpanded] = useState(false)
	const guidePage = !!props.children ? props.children : <DefaultGuide/>;
	return (
		<>
			<NavbarTopPage>
				<div className="text-center guide-glossary">
					<div className="scrollbar scrollbar-guide z-depth-3">
						<div className="glossary p-0 pt-2 pb-3">
							<MDBBtn onClick={() => setExpanded(!expanded)} className="white-text" color="default">
								{expanded ? "Hide Guide Menu" : "Show Guide Menu"}
							</MDBBtn>
							<MDBCollapse isOpen={expanded} className="p-0">
								<GuideMenuItem header={true}/>
								<GuideMenuItem/>
								<GuideMenuItem header={true}/>
								<GuideMenuItem/>
							</MDBCollapse>
						</div>
					</div>
				</div>
				<MDBContainer fluid id="guide-container">
					{
						guidePage
					}
				</MDBContainer>
			</NavbarTopPage>
		</>
	)
}
export default GuidesHome
