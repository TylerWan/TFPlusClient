//import Link from 'next/link'

import fs from 'fs'
import Head from 'next/head'
import {NavbarTopPage} from "../components/templates/NavbarTopPage";
import React from "react";
import {
	MDBAnimation,
	MDBBtn, MDBBtnGroup,
	MDBCol,
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
	MDBIcon,
	MDBMask,
	MDBRow,
	MDBView
} from "mdbreact";

// posts will be populated at build time by getStaticProps()
function OldHomepage() {
/*    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
                <title>Competitive TF2 Guide</title>
                <link rel="stylesheet" href="/welcome-comp/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i"/>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"/>
                <link rel="stylesheet" href="/welcome-comp/css/styles.min.css"/>
                <link rel="stylesheet" href="/welcome-comp/fonts/fontawesome-all.min.css"/>
                    <link rel="stylesheet" href="/welcome-comp/fonts/ionicons.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.2.0/aos.css"/>
                <link rel="stylesheet" href="/welcome-comp/custom/tfplus.css"/>
            </Head>
            <NavbarTopPage>
                <div dangerouslySetInnerHTML={{ __html: oldHomepageHTML }} />
            </NavbarTopPage>

        </div>
    )*/
    
    return (
	    <>
		    <NavbarTopPage>
		    <MDBContainer fluid id="videobackground">
			    <MDBView>
				    <video className="video-intro" playsInline
				           autoPlay muted={true} loop>
					    <source src="./old-homepage/videos/slowintro.mp4" type="video/mp4" />
				    </video>
				    <MDBMask className="d-flex justify-content-center align-items-center gradient">
					    <MDBContainer fluid className="px-md-3 px-sm-0 front-intro">
						    <MDBRow className="w-100 pt-0">
							    <MDBCol md="6" className="mb-4 white-text text-center pt-4">
								    <h5 className="display-5 font-weight-bold mb-0 mukta-regular">
									    <MDBAnimation type="fadeInDown" duration={500}>
										    Welcome{" "}
									    </MDBAnimation>
									    <MDBAnimation type="fadeInDown" duration={500} delay="500ms">
										    to...
									    </MDBAnimation>
								    </h5>
								    <MDBAnimation type="flipInX" delay="1s">
									    <h1 className="display-1 front-tfp mukta-bold">
										    TF+
									    </h1>
								    </MDBAnimation>
								    <MDBAnimation type="fadeIn" duration={800} delay="2s">
									    <h4 className="mukta-medium">
										    All Your Team Fortress 2 Needs in One Place!
									    </h4>
								    </MDBAnimation>
							    </MDBCol>
							    <MDBCol md="6" className="text-center white-text d-flex justify-content-center align-items-center">
								    <MDBContainer>
									    <h1 className="mukta-bold">
										    <MDBAnimation type="fadeInDown" delay="500ms" duration={500}>
											    <i>Explore...</i>
										    </MDBAnimation>
									    </h1>
									    <MDBRow className="my-0 my-lg-4">
										    <MDBCol>
											    <MDBAnimation type="fadeInDown" delay="500ms" duration={500}>
												    <MDBBtn outline color="info" className="front-explore-btn p-1 p-lg-4">
													    <MDBIcon icon="trophy" /> Competitive
												    </MDBBtn>
											    </MDBAnimation>

										    </MDBCol>
									    </MDBRow>
									    <MDBRow className="my-0 my-lg-4">
										    <MDBCol>
											    <MDBAnimation type="fadeInDown" delay="600ms" duration={500}>
												    <MDBBtn outline color="success" className="front-explore-btn p-1 p-lg-4">
													    <MDBIcon icon="map" /> Guides
												    </MDBBtn>
											    </MDBAnimation>
										    </MDBCol>
									    </MDBRow>
									    <MDBRow className="my-0 my-lg-4">
										    <MDBCol>
											    <MDBAnimation type="fadeInDown" delay="700ms" duration={500}>
												    <MDBBtn outline color="secondary" className="front-explore-btn p-1 p-lg-4">
													    <MDBIcon icon="file" /> Assets
												    </MDBBtn>
											    </MDBAnimation>

										    </MDBCol>
									    </MDBRow>

								    </MDBContainer>
							    </MDBCol>
						    </MDBRow>
					    </MDBContainer>
				    </MDBMask>
			    </MDBView>
		    </MDBContainer>
		    <MDBContainer>
			    <MDBRow className="pt-5 pb-4">
				    <MDBCol md="12" className="text-center">
					    <p>
						    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
						    enim ad minim veniam, quis nostrud exercitation ullamco laboris
						    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
						    sunt in culpa qui officia deserunt mollit anim id est laborum.
					    </p>
				    </MDBCol>
			    </MDBRow>
		    </MDBContainer>
		    </NavbarTopPage>
	    </>

    )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
/*export async function getStaticProps() {

   const oldHomepageHTML = fs.readFileSync('./public/pages/homepage.html', 'utf8')
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            oldHomepageHTML
        },
    }
}*/

export default OldHomepage
