import React from "react";
import {MDBBtn, MDBIcon, MDBTypography} from "mdbreact";
import {isSteamId} from 'utils/parsing'

function SteamLoginCard(props: any) {
    return <>
        <div className={"feature-float-box login-card text-center col-md-4"}>
            <LoginStatus userInfo={props.userInfo} hasSteam={isSteamId(props.userInfo?._steamId)} icon={"steam"}/>
        </div>

    </>
}

export default SteamLoginCard


function LoginStatus(props: any) {
    if (!!props.userInfo?.steamId) {
        return <>
            <LoginIcon icon={props.icon} loginIconClass={"text-success"}/>
            <h1>
                Successfully Logged In
            </h1>
            <a target="_blank" href={'https://steamcommunity.com/profiles/' + props.userInfo?.steamId} className={"login-page-id-link"}>
                { props.userInfo?.steamId }
            </a>
        </>

    }
    return <>
        <LoginIcon icon={props.icon} loginIconClass={"text-danger"}/>
        <h1>
            No Account Found
        </h1>
        <br/>
        <MDBBtn color="primary" size="lg" href="http://localhost:8080/auth/steam">Log in with steam</MDBBtn>
    </>
}

function LoginIcon(props: any) {
    return <div className={"login-icon-container"}>
        <MDBIcon fab icon={props.icon} className={props.loginIconClass + " " + "login-icon"}/>
    </div>
}
