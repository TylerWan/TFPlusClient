import React from "react";

interface classEmblemProps {
	emblem: "scout" | "soldier" | "pyro" | "demoman" | "heavy" | "engineer" | "medic" | "sniper" | "spy"
}
import { ReactSVG } from 'react-svg'

export default function ClassEmblem(props: classEmblemProps) {
	return (
			<img src='/images/emblems/medic.svg' alt="React Logo" className="emblem-test p-0"/>
	)
}
