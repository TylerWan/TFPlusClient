import React from "react";
import {MDBBtn, MDBIcon, MDBTypography} from "mdbreact";
import {isDiscordId} from 'utils/parsing'

function DiscordLoginCard(props: any) {
    let card = <></>
    if (props.userInfo?.steamId) {
        card = <>
            <div className={"feature-float-box login-card text-center col-md-4"}>
                <LoginStatus userInfo={props.userInfo} hasDiscord={isDiscordId(props.userInfo?.discordId)} icon={"discord"}/>
            </div>

        </>
    }
    return card;
}

export default DiscordLoginCard


function LoginStatus(props: any) {
    if (props.userInfo?.discordId) {
        return <>
            <LoginIcon icon={props.icon} loginIconClass={"text-success"}/>
            <h1>
                Successfully Linked
            </h1>
            <p className={"login-page-id"}>
                { props.userInfo?.discordId }
            </p>
        </>


    }
    return <>
        <LoginIcon icon={props.icon} loginIconClass={"text-danger"}/>
        <h1>
            No Account Found
        </h1>
        <br/>
        <MDBBtn color="primary" size="lg" href="http://localhost:8080/auth/discord">Connect Discord Account</MDBBtn>
    </>
}

function LoginIcon(props: any) {
    return <div className={"login-icon-container"}>
            <MDBIcon fab icon={props.icon} className={props.loginIconClass + " " + "login-icon"}/>
        </div>
}
