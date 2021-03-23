import processSelfInfo from '../../../server/handlers/createInternalCommHandler'
function userSelfHandler(req: any, res: any, userData: any){
    const {
        query: {},
        method,
    } = req
    
    switch (method) {
        case 'GET':
            res.status(200).json(userData?.user || null);
            break;
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ dolphin: `dolphinputtit` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
export default processSelfInfo(userSelfHandler)
