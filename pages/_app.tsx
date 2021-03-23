// import App from "next/app";
import React, {useEffect, useState} from 'react';
import type { AppProps /*, AppContext */ } from 'next/app'
import '@fortawesome/fontawesome-free/css/all.min.css'; import
    'bootstrap-css-only/css/bootstrap.min.css'; import
    'mdbreact/dist/css/mdb.css';
import { CookiesProvider } from 'react-cookie';
import '../public/css/tf-plus.css'
import { useRouter } from 'next/router'
import socketIOClient from "socket.io-client";
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    
    let styles = <></>;
    if (router.asPath.includes('/broadcasts/casts/') && router.asPath.includes('/gfx/')) {
        styles = <link rel="stylesheet" href="/css/tf-plus-gfx.css"/>
    } else {
        styles = <link rel="stylesheet" href="/css/tf-plus.css"/>;
    }
    
    
    return (
        <CookiesProvider>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.0.0/mdb.min.css"
                    rel="stylesheet"
                />
                <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin=""/>
                <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossOrigin=""/>

            {styles}
                <Component {...pageProps} />
        </CookiesProvider>
    )
}

export default MyApp

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }


