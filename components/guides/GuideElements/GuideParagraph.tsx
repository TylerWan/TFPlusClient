import {GuideHeader, GuideHeader2, GuideSubHeader} from "./GuideHeader";
import React from "react";
import GuideParagraphText from "./GuideParagraphText";
import {MDBContainer} from "mdbreact";

interface propObj {
	element: any,
}

export default function GuideParagraph(props: propObj) {
	let paragraphStyle = props.element?.paragraphStyle;
	let bullet = props.element?.bullet;
	let paragraph = props.element;
	
	let paragraphElements = paragraph.elements.map((element: any, i: any) =>
		<GuideParagraphText element={element} key={i}/>
	)
	if (bullet) {
		let cName = 'ubl-list ' + bullet.listId.replace('kix.', '').replace('..', '.').replace(/[0-9]/, 'a');
		paragraphElements = <div className={cName}><li>{paragraphElements}</li></div>
	}
	
	if (paragraphStyle.alignment === "CENTER") {
		paragraphElements = <MDBContainer className="text-center d-inline-block">{paragraphElements}</MDBContainer>
	}

	switch(paragraphStyle.namedStyleType) {
		case "TITLE": {
			return <GuideHeader>{ paragraphElements }</GuideHeader>
		}
		case "HEADING_1": {
			return <GuideSubHeader>{ paragraphElements } </GuideSubHeader>
		}
		case "HEADING_2": {
			return <GuideHeader2>{ paragraphElements } </GuideHeader2>
		}
		default:
			return <span className="guide-reg">{ paragraphElements }</span>
	}
	

}
