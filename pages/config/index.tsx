//import Link from 'next/link'

import fs from 'fs'
import Head from 'next/head'

// posts will be populated at build time by getStaticProps()
function StartConfig({ configHTML }: any) {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
                <title>TF+ Beginner Config</title>
                <link rel="stylesheet" href="/welcome-comp/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i"/>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"/>
                <link rel="stylesheet" href="/welcome-comp/css/styles.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.2.0/aos.css"/>
                <link rel="stylesheet" href="/welcome-comp/css/tfplus.css"/>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: configHTML }} />
        </div>
    )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {

    const configHTML = fs.readFileSync('./public/pages/beginAssets.html', 'utf8')
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            configHTML
        },
    }
}

export default StartConfig
