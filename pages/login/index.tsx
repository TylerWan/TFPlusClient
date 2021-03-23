import React, {Component, useEffect} from 'react'
import SteamLoginCard from "../../components/auth/SteamLoginCard";
import DiscordLoginCard from "../../components/auth/DiscordLoginCard";
import {
    MDBAlert, MDBBtn,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon, MDBNavItem
} from "mdbreact";
import {NavbarTopPage} from "../../components/templates/NavbarTopPage";
import useSelfAccountInfo from "../../hooks/auth/useUserAccount";
import Link from 'next/link'

/*let userProps = {
    username: 'DolphiN',
    steamId: '76561198048614515',
    discordId: '159569193237348352',
    hasDiscord: false,
    imgUrl: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/21/2115aae53f4d4361dd8f9c8042e24399c944e8b7_full.jpg'
}*/

export function LoginPage() {
        const { userInfo } = useSelfAccountInfo()
        return (<>
            <NavbarTopPage>
                <div className="container-fluid mt-5 pt-5">
                    <div className={"row d-flex justify-content-evenly gy-5"}>
                        <SteamLoginCard userInfo={userInfo}/>
                        <DiscordLoginCard userInfo={userInfo}/>
                    </div>
                </div>
                <MDBContainer>
                    <MDBAlert color="success" className="row">
                        <h3 className="alert-heading text-center">
                            Your Privacy is Important!
                            <br/>
                        </h3>
                        <hr/>
                        <dt className="col-sm-3">Public information we store securely:</dt>
                        <dd className="col-sm-9">
                            <ul>
                                <li>Account ID number</li>
                                <li>Username</li>
                                <li>Profile picture</li>
                            </ul>
                        </dd>
                        <hr/>
                        <dt className="col-sm-3">What we <u>CAN NOT</u> access:</dt>
                        <dd className="col-sm-9">
                            <ul>
                                <li>E-mail</li>
                                <li>Ability to do actions on your behalf, such as sending messages</li>
                                <li>What Discord server(s) you are in</li>
                                <li>Your favorite color</li>
                            </ul>
                        </dd>
                        <small>This website uses cookies, never for advertising or distributing to 3rd parties.</small>
                    </MDBAlert>
                </MDBContainer>
            </NavbarTopPage>
            </>
        )
}

export default LoginPage

export function TopNavBarProfile() {
    const { userInfo, isLoading } = useSelfAccountInfo()
    if ( !userInfo && !isLoading) {
        return <MDBBtn href="/login" outline color="light">Log In</MDBBtn>
    }
    const profileIcon = userInfo?.avatarUrl ?
        <img src={ userInfo.avatarUrl } className="rounded-circle z-depth-0 "
             style={{ height: "35px", padding: 0 , marginLeft: "5px"}} alt=""/> :
        <MDBIcon icon="user-circle" style={{ fontSize: "32px", padding: 0 }} />

    if (!isLoading) return (
    <MDBNavItem>
        <MDBDropdown>
            <MDBDropdownToggle className="dopdown-toggle" nav>
                { userInfo.username }
                { profileIcon }
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default" right>
{/*                <MDBDropdownItem href="#!">My account</MDBDropdownItem>*/}
                <MDBDropdownItem>
                    <Link href="/login">
                        <a>Link Accounts</a>
                    </Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                    <Link href="/logout">
                        <a>Log Out</a>
                    </Link>
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    </MDBNavItem>
    ); else return null;
    
}
