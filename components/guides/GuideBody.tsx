import React from "react";
import Head from 'next/head'
import {MDBContainer} from "mdbreact";
import GuideParagraph from "./GuideElements/GuideParagraph";
import GuideElement from "./GuideElements/GuideElement";

interface propObj {
	guideJson: any
}

export function GuideBody(props: propObj) {
	if (!props?.guideJson?.body?.content) {
		return <h1>not founs!</h1>
	}
	let guide = props.guideJson;
	let content = guide.body.content;
	let lists = guide?.lists;
	let listSt = "";
	if (!!lists) {
		let listIds = Object.keys(lists);
		
		for (let i in listIds) {
			let listId = listIds[i];
			let ml = lists[listId]?.listProperties?.nestingLevels[0]?.indentStart?.magnitude;
			
			if (listId && ml) {
				listSt += listId.replace(/kix/ig, '').replace('..', '.').replace(/[0-9]/, 'a')+ '{' +
					"margin-left: " + ml + "px}"
			}
			
		}
	}
	
	let inlineObjects = guide?.inlineObjects;
	if (!!inlineObjects) {
		for (let linObj in inlineObjects) {
			if (inlineObjects.hasOwnProperty(linObj) && inlineObjects[linObj].objectId) {
				let objId = inlineObjects[linObj].objectId
				let objProp = inlineObjects[linObj].inlineObjectProperties;
				if (!!objId && !!objProp && !!objProp.embeddedObject && !!objProp.embeddedObject?.imageProperties?.contentUri) {
					let embed = objProp.embeddedObject;
					listSt += "#" + objId.replace('.', '') + "{" +
					"height: " + (embed?.size?.height?.magnitude*1.5 || 0) + "px;" +
					"width: " + (embed?.size?.width?.magnitude*1.5 || 0) + "px;" +
						"background-image: url(" + objProp.embeddedObject?.imageProperties?.contentUri + ");"+
						"background-size: contain;background-repeat: no-repeat" +
					"}"
				}
			}
		}
	}

	
	let elements = content.map((element: any, i: any) =>
		<GuideElement element={element} key={i}/>
	)
	
	return <div className="pb-5">
		<Head>
			<title>TF+ Guide: {guide.title}</title>
		</Head>
		<style>{listSt}</style>
		<MDBContainer className="guide-body">
			{elements}
		</MDBContainer>
	</div>

}

export default GuideBody;
