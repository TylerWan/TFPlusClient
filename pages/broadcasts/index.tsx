import {NavbarTopPage} from "../../components/templates/NavbarTopPage";
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";

export default function BroadcastsIndex() {
	return (
		<NavbarTopPage>
			<MDBContainer fluid className="pt-4">
				<MDBRow>
					<MDBCol>
						<h1 className="display-5">
							Popular
						</h1>
					</MDBCol>
				</MDBRow>
				<MDBRow center className="px-1">
					<MDBCol className="text-center col-12 col-md-3 col-lg-2 stream-col p-0 z-depth-2 d-flex align-items-end justify-content-center">
						<div className="bg-dark text-white w-100 py-1">
							RGLgg
							<MDBIcon icon="user-alt" className="ml-2 text-danger" /> 500
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</NavbarTopPage>
	)
}
