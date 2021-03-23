import GuidesHome from "./index";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import DefaultGuide from "../../components/guides/DefaultGuide";
import GuideBody from "../../components/guides/GuideBody";

export function GuidePage({ guideDocJSON }: any) {
	const router = useRouter()
	const { guideId } = router.query
	return (
		<GuidesHome>
			<GuideBody guideJson={guideDocJSON}/>
		</GuidesHome>
	)
}
export async function getStaticPaths() {

	// Get the paths we want to pre-render based on posts
	let posts = [{hey: "me"}]
	const paths = posts.map((post) => ({
		params: { guideId: "ee" },
	}))
	
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false }
}

export async function getStaticProps() {
	let guideDocJSON = await fetch('http://localhost:8080/api/doc/1uf-lTuzP5nXI_-aVQbFWzpu-fyHNi0lQ8cI05Vfiq9A');
	guideDocJSON = await guideDocJSON.json()
	//console.log(guideDocJSON)
	return {
		props: {
			guideDocJSON
		}
		
	}
}
export default GuidePage
