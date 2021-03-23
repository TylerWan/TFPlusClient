import React from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBContainer,
    MDBIcon,
    MDBFormInline,
    MDBAnimation,
    MDBLink,
    MDBTooltip
} from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css'; import
    'bootstrap-css-only/css/bootstrap.min.css'; import
    'mdbreact/dist/css/mdb.css';
import {TopNavBarProfile} from "../../pages/login";
import Link from 'next/link'

export class NavbarTopPage extends React.Component {
    state = {
        collapseID: ""
    };
    
    toggleCollapse = (collapseID: any) => () =>
        this.setState((prevState: any) => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    
    render() {
        return (
            <>
                <MDBContainer fluid className="topNavBarContainer p-0">
                    <MDBNavbar color="light-blue darken-3" dark expand="md" className="topNavBar mukta-medium">
                        <MDBNavbarBrand>
                            <Link href="/">
                                <strong className="white-text mukta-bold"><a>TF+</a></strong>
                            </Link>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem className="mx-1">
                                    <Link href="/">
                                        <a className="nav-link">Home</a>
                                    </Link>
                                </MDBNavItem>
                                
{/*                                <MDBNavItem className="mx-1">
                                    <Link href="/guides">
                                        <a className="nav-link">Guides</a>
                                    </Link>
                                </MDBNavItem>*/}
                                
{/*                                <MDBNavItem className="mx-1">
                                    <Link href="/">
                                        <a className="nav-link">Assets</a>
                                    </Link>
                                </MDBNavItem>*/}
                                <MDBNavItem className="mx-2">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Community</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem header>Reddit <MDBIcon fab icon="reddit-alien" /></MDBDropdownItem>
                                            <MDBDropdownItem href="http://reddit.com/r/tf2" target="_blank">/r/tf2</MDBDropdownItem>
                                            <MDBDropdownItem href="http://reddit.com/r/truetf2" target="_blank">/r/truetf2</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                                <MDBNavItem className="mx-2">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            Pick-up Games
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem header>North America</MDBDropdownItem>
                                            <MDBDropdownItem href="https://www.faceit.com/en/game/tf2" target="_blank">FACEIT</MDBDropdownItem>
                                            <MDBDropdownItem href="https://newbie.tf/" target="_blank">Newbie.tf</MDBDropdownItem>
                                            <MDBDropdownItem href="https://rgl.gg/pugs/" target="_blank">RGL</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                                <MDBNavItem className="mx-2">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">League Forums</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem header><u>North America</u></MDBDropdownItem>
                                            <MDBDropdownItem href="https://forums.rgl.gg/" target="_blank">RGL.gg</MDBDropdownItem>
                                            <hr/>
                                            <MDBDropdownItem header><u>Europe</u></MDBDropdownItem>
                                            <MDBDropdownItem href="https://etf2l.org/forum/" target="_blank">ETF2L</MDBDropdownItem>
                                            <hr/>
                                            <MDBDropdownItem header><u>Asia/Oceania</u></MDBDropdownItem>
                                            <MDBDropdownItem href="https://ozfortress.com/forums" target="_blank">OZFortress</MDBDropdownItem>
                                            <MDBDropdownItem href="https://discord.rsl.tf/" target="_blank">Respawn League <MDBIcon fab icon="discord" /></MDBDropdownItem>
                                            <hr/>
                                            <MDBDropdownItem header><u>South America</u></MDBDropdownItem>
                                            <MDBDropdownItem href="https://fbtf.tf/forums" target="_blank">FBTF</MDBDropdownItem>
                                            <hr/>
                                            <MDBDropdownItem header><u>Other</u></MDBDropdownItem>
                                            <MDBDropdownItem href="https://discord.gg/ugcleague" target="_blank">UGC <MDBIcon fab icon="discord" /></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <TopNavBarProfile/>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </MDBContainer>
                { this.props.children }
            </>
        );
    }
}
