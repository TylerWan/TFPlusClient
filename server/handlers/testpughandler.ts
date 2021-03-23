import fetch from "node-fetch";

const processPugChannels = (handler: any) => async (req: any, res: any) => {
	return await fetch ('http://localhost:8080/api/pug/channels/waiting').then(async channelResponse => {
		return await channelResponse.json().then(channels => {
			return handler(req, res, channels);
		})
	})
}
export default processPugChannels
