import getRGLProfileInfo from "./RGLFetch";

export async function getLatestRGL(steamId: any, discordId: any) {
    return getRGLProfileInfo(steamId, discordId)
}
