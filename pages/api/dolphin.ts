export default function dolphinHandler(req: any, res: any) {
    const {
        //query: { id, name },
        method,
    } = req

    switch (method) {
        case 'GET':
            // Get data from your database
            res.status(200).json(["eyy", "booo"])
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({ dolphin: `dolphinputtit` })
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
