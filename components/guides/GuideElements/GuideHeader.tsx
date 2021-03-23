import React from "react";

export function GuideHeader(props: any) {
	return (
		<h1 className="text-center display-1 mt-5">
			{props.children}
		</h1>
	)
}
export function GuideSubHeader(props: any) {
	return (
		<h2 className="mt-5">
			{props.children}
		</h2>
	)
}

export function GuideHeader2(props: any) {
	return (
		<h3 className="mt-5">
			{props.children}
		</h3>
	)
}
