import {DiscordClient} from "models/clients/Client";
const ytdl = require("ytdl-core");
// @ts-ignore
export async function createDiscordHandler(discord: DiscordClient) {
    discord.connect();
    const client = discord.getClient();
    client.on('ready', () => {
        console.log("Connected to Discord as " + client.user.tag);
        /*client.channels.fetch("330175963977613312").then(async (channel: any) => {
            console.log(channel.name)
            console.log(require("path").join(__dirname, './rick.mp3'))
            ///!*
            channel.join().then(async (connection: any) => {
                console.log('broadcast')
                setTimeout(async () => {
                    console.log('playin')
                    connection.play(ytdl('https://www.youtube.com/watch?v=8Kkrmubsgf8', {quality: 'highestaudio'}));
                    //connection.play(require("path").join(__dirname, './meow.mp3'));
                }, 2000)

                setTimeout(async () => {
                    await connection.disconnect();
                    console.log('loggin out')
                }, 90000)
            })
        })*/
    });
}
