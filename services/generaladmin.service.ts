import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new event */
async function CreateGeneralAdmin({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const GeneralAdmins = db.collection('generaladmin')
    const resp = GeneralAdmins.insertOne(req.body)
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

/* GET events */
async function GetGeneralAdmins({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const GeneralAdmins = db.collection('generaladmin')
    const resp = GeneralAdmins.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Event by id */
async function GetGeneralAdminById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const GeneralAdmins = db.collection('generaladmin')
    const newId = new ObjectId(req.params.id)
    const resp = GeneralAdmins.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("GeneralAdmin con Id especificado no existe")
    }
    
}


/* ☝️ PUT Update a event by ID*/
async function UpdateGeneralAdminById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const GeneralAdmins = db.collection('generaladmin')
    const newId = new ObjectId(req.params.id)
    const resp = GeneralAdmins.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("GeneralAdmin con Id especificado no existe")
    }
}

/* DELETE a event by Id  */
async function DeleteGeneralAdminById({ req, res }: Context) {
    const id = req.params.id
    const { db, connection, ObjectId } = await createConnection()
    const GeneralAdmins = db.collection('generaladmin')
    const newId = new ObjectId(req.params.id)
    const resp = GeneralAdmins.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("GeneralAdmin con Id especificado no existe")
    }
    
}




export default { CreateGeneralAdmin, GetGeneralAdmins, GetGeneralAdminById, UpdateGeneralAdminById, DeleteGeneralAdminById};