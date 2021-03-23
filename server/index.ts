import next from 'next'
import * as http from "http";
import Emittery from "emittery";
const fs = require('fs');
import handleRouting from "./routing";
import {createSocketHandler} from "./handlers/createSocketHandler";
import * as commHandler from './handlers/createInternalCommHandler';
import {createRequestHandler} from "./handlers/createRequestHandler";
import {DiscordClient, FirebaseClient} from "../models/clients/Client";
import {createDatabaseHandler} from "./handlers/createDatabaseHandler";
import {createDiscordHandler} from "./handlers/createDiscordHandler";
import {CustomFirestoreDatabase} from "../utils/database/FirestoreDatabase";
//import {Socket} from "socket.io";

//
// const options = {
//     key: fs.readFileSync(__dirname +'/certs/selfsigned.key'),
//     cert: fs.readFileSync(__dirname +'/certs/selfsigned.crt'),
//     requestCert: false,
//     rejectUnauthorized: false
// }
let admin = require('firebase-admin');
admin.initializeApp({

});

/*const db = admin.firestore();
let myFirestore = new CustomFirestoreDatabase();
myFirestore.initDb(db).then(r => {});*/
// @ts-ignore
const port = parseInt(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dir: ".", dev })
const handle = nextApp.getRequestHandler()

const https = require('https');
const passport = require("passport");
const SteamStrategy = require('passport-steam').Strategy;
//const server = require('http').createServer(app);
const DiscordStrategy = require('passport-discord').Strategy;

nextApp.prepare().then(() => {

    passport.serializeUser(function(user:any, done:any) {
        done(null, user);
    });

    passport.deserializeUser(function(obj:any, done:any) {
        done(null, obj);
    });
    let localSteamStrategy = {
        returnURL: 'http://localhost:3000/auth/steam/callback',
        realm: 'http://localhost:3000/',
        apiKey: 'B232601FCB8754E2844A33F4B6CAFBBC'
    };
    let prodSteamStrategy = {
        returnURL: 'http://localhost:3000/auth/steam/callback',
        realm: 'http://localhost:3000/',
        apiKey: 'B232601FCB8754E2844A33F4B6CAFBBC'
    };

    const app = require('express')();
    let server = http.createServer(app);
    //let servers = https.createServer(options, app);


    passport.use(new SteamStrategy((dev ? localSteamStrategy : prodSteamStrategy),
        function(identifier: any, profile: any, done: any) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Steam profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Steam account with a user record in your database,
                // and return that user instead.
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    ));
    let localDiscordStrategy = {
        clientID: '746194841464995942',
        clientSecret: 'XRgvsib7FHRhl4Yu6a3c5Vtx0wxvpnj7',
        callbackURL: 'http://localhost:3000/auth/discord/callback',
        scope: ['identify']
    };
    let prodDiscordStrategy = {
 scope: ['identify']
    };
    passport.use(new DiscordStrategy((dev ? localDiscordStrategy : prodDiscordStrategy),
        function(accessToken: any, refreshToken: any, profile: any, done: any) {
            process.nextTick(function() {
                return done(null, profile);
            });

        }));

    app.use(passport.initialize());
    app.use(passport.session());



    //const emitter = require('./handlers/emitObj').getEmitter();





    const io = require('socket.io')(server, {
        maxHttpBufferSize: 10000
    });

    //const socketHandler = createSocketHandler(io, emitter);
    const requestHandler = createRequestHandler;

    server.listen(port, () => {
        console.log("Http server listing on port : " + port)
        console.log("http://localhost:" + port)
    });

    //io.on('connection', socketHandler);




    //commHandler.createCommHandler(emitter);
    handleRouting(app, nextApp, handle)
    //const myFirebase = new FirebaseClient('firstfire', serviceAccount);

    //const fireRef = myFirebase.getAdmin().database().ref();

    //createDatabaseHandler(fireRef, emitter);


    const myDiscord = new DiscordClient("primaryDiscordClient", "NTkyMTU4NDMzMzMyMDM1NTk2.XbI9Fg.-QReL-cwMq5cQAHNc7PPsB-1RNk");
/*
        servers.listen(port, () => {
            console.log(`> Ready on https://localhost:` + port)
        })*/

})
