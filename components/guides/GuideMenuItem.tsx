import Link from "next/link";
import React from "react";

export function GuideMenuItem(props: any) {
	if (props.header) {
		return (
			<>
				<div className="g-m-item w-100 g-m-header text-white">
					<h3 className="m-0  mukta-bold">
							Menu Header
					</h3>
				</div>
			</>
		)
	}
	return (
		<>
			<Link href={
				{
					pathname: '/guides/[guideId]',
					query: {guideId: 'ee'}
				}
			}>
				<div className="g-m-item w-100 hov-point">
					<h5 className="m-0 mukta-regular">
						Menu Item
					</h5>
				</div>
			</Link>

		</>
	)
}
export default GuideMenuItem
