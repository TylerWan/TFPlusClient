import React from "react";
import {MDBContainer} from "mdbreact";

interface textProp {
	element: any
}

export default function GuideParagraphText(props: textProp) {
	let startIndex = props.element?.startIndex;
	let endIndex = props.element?.endIndex;
	let inlineObject = props.element?.inlineObjectElement;
	
	
	// Text run
	let textRun = props.element?.textRun;
	let textStyle = {
		isBold: textRun?.textStyle?.bold,
		isItalic: textRun?.textStyle?.italic,
		link: textRun?.textStyle?.link?.url,
		isUnderline: textRun?.textStyle?.underline,
		weightedFontFamily: textRun?.textStyle?.weightedFontFamily,
		foregroundColor: textRun?.textStyle?.foregroundColor
	};
	
	let textElement = textRun?.content || "";
	if (textRun?.content?.includes('\u000b')) {
		if (textRun?.content?.indexOf('\u000b') === 0) {
			textRun = (textRun?.content.replace('\u000b', ''))
			textElement = <><br/><span className="list-indent"> { textRun } </span></>
		} else {
			textElement = (textRun?.content?.replace('\u000b', ''))
			
		}
	}
	if (textRun?.content?.includes('\n')) {
		textElement = (<><span>{ textElement }</span> <br/></>)
	}
	if (textStyle.weightedFontFamily?.fontFamily) {
		textElement = (<span style={{fontFamily: textStyle.weightedFontFamily?.fontFamily}}>{ textElement }</span>)
	}
	if (textStyle.foregroundColor) {
		let colors = textStyle.foregroundColor?.color?.rgbColor;
		if (colors) {
			textElement = (<span style={
				{
					color: "rgb(" + (colors.red * 255) + ',' +
						(colors.green * 255) + ',' +
						(colors.blue * 255) + ')'
				}
			}>{ textElement}</span>)
		}

	}
	if (textStyle.isBold) {
		textElement = <b> {textElement} </b>
	}
	if (textStyle.isItalic) {
		textElement = <i> {textElement} </i>
	}
	if (textStyle.isUnderline) {
		textElement = <u> {textElement} </u>
	}
	if (textStyle.link) {
		textElement = <a href={textStyle?.link} target="_blank"> { textElement }</a>
	}
	
	if (inlineObject && !!inlineObject.inlineObjectId) {
		textElement = <MDBContainer className="d-flex align-items-center justify-content-center"><div id={inlineObject.inlineObjectId.replace('.', '')}/>{textElement}</MDBContainer>
	}

	
	return textElement;
	
}
