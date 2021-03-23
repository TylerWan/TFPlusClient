import GuideParagraph from "./GuideParagraph";
import React from "react";

interface propObj {
	element: any
}

export default function GuideElement(props: propObj) {
	let paragraph = props.element?.paragraph;
	let subElements = props.element?.elements;
	if (paragraph) {
		return <GuideParagraph element={paragraph}/>
	} else {
		return <></>
	}

}
