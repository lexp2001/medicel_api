import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new tips */
async function CreateTips({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.insertOne(req.body)
    var body = null
    try {
        body = await resp
        connection.close()
        res.status(201).json(body)
    } catch (error) {
        connection.close()
        res.status(500).json(error)
    }
}


/* GET tips */
async function GetTips({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET tip by id */
async function GetTipsById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Tips = db.collection('tips')
    const newId = new ObjectId(req.params.id)
    const resp = Tips.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
    
}

/* ☝️ PUT Update a sanitaryQuestions by ID*/
async function UpdateTipsById(id: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Tips = db.collection('tips')
    const newId = new ObjectId(id)
    const resp = Tips.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Tips con Id especificado no existe")
    }
}

/* DELETE a tip by Id  */
async function DeleteTipsById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Tips = db.collection('tips')
    const newId = new ObjectId(req.params.id)
    const resp = Tips.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Tips con Id especificado no existe")
    }
    
}

export default { CreateTips, GetTips, GetTipsById, UpdateTipsById, DeleteTipsById};