import processPugChannels from "../../../server/handlers/testpughandler";

function pugChannelsHandler(req: any, res: any, channels: any){
	const {
		query: {},
		method,
	} = req
	
	switch (method) {
		case 'GET':
			res.status(200).json(channels || null);
			break;
		default:
			res.setHeader('Allow', ['GET', 'PUT'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
export default processPugChannels(pugChannelsHandler)
