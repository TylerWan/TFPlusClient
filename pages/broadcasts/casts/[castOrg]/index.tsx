import { useRouter } from 'next/router'
import {NavbarTopPage} from "../../../../components/templates/NavbarTopPage";
import {MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBInput, MDBNavbarBrand, MDBRow, MDBTypography} from "mdbreact";
import Link from "next/link";
import React, {useState} from "react";
import { EditText, EditTextarea } from 'react-edit-text';
export default function CastBroadcastControl() {
	const router = useRouter()
	const { castOrg } = router.query
	
	const [title, setTitle] = useState('default title');
	const [teamName1, setTeamName1] = useState('blu');
	const [teamName2, setTeamName2] = useState('red');
	const [caster1Name, setCaster1Name] = useState('name1');
	const [caster2Name, setCaster2Name] = useState('name2');
	
	return (
		<NavbarTopPage>
			<MDBContainer fluid>
				<MDBRow>
					<MDBCol className="col-auto p-3">
						<div>
							<MDBTypography tag='h1' variant="h1-responsive" className="text-center">
								<Link href={{
									pathname: '/broadcasts/casts/[castOrg]',
									query: { castOrg: 'RGLgg' },
								}}>
										<a>RGLgg</a>
								</Link>
							</MDBTypography>
						</div>
						<hr/>
						<div  className="p-2 c-menu c-menu-selected">
							<Link href={{
								pathname: '/broadcasts/casts/[castOrg]',
								query: { castOrg: 'RGLgg' },
							}}>
								<a>
									<div>
										<h3 className="m-0 c-menu-text c-menu-text-selected">
											Casters
										</h3>
									</div>
								</a>
							</Link>
						</div>
						<div  className="p-2 c-menu">
							<Link href={{
								pathname: '/broadcasts/casts/[castOrg]',
								query: { castOrg: 'RGLgg' },
							}}>
								<a>
									<div>
										<h3 className="m-0 c-menu-text">
											Production
										</h3>
									</div>
								</a>
							</Link>
						</div>
					</MDBCol>
					<MDBCol className="p-3">
						<MDBRow around>
							<MDBCol className="text-center">
								<h4>
									Title
								</h4>
								<hr className="w-50 mx-auto"/>
								<h1 className="editable">
									<EditText
										name="textbox1"
										value={title}
										onChange={setTitle}
									/>
								</h1>
							</MDBCol>
							<MDBCol className="text-center">
								<h4>
									Match
								</h4>
								<hr className="w-50 mx-auto"/>
								<h1>
									<EditText
										name="textbox2"
										value={teamName1}
										onChange={setTeamName1}
									/>
								</h1>
								<h5>
									vs
								</h5>
								<h1>
									<EditText
										name="textbox3"
										value={teamName2}
										onChange={setTeamName2}
									/>
								</h1>
								<MDBInput label="Small input" size="sm" />
							</MDBCol>
							<MDBCol className="text-center">
								<h4>
									Talent
								</h4>
								<hr className="w-50 mx-auto"/>
								<MDBRow>
									<MDBCol>
										<img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/85/85d0bdbae886b732809dd1e93cefa2d041089a07_full.jpg" alt=""
										     className="c-talent-pic"/>
										
										<EditText
											name="textbox3"
											value={caster1Name}
											onChange={setCaster1Name}
											placeholder={"Caster 1 Name"}
										/>
									</MDBCol>
									<MDBCol>
										<img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/85/85d0bdbae886b732809dd1e93cefa2d041089a07_full.jpg" alt=""
										     className="c-talent-pic "/>
										<EditText
											name="textbox3"
											value={caster2Name}
											onChange={setCaster2Name}
											placeholder={"Caster 2 Name"}
										/>
									</MDBCol>
								</MDBRow>
							</MDBCol>
						</MDBRow>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</NavbarTopPage>
	)
}
