import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new labor */
async function CreateLaborUser({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsUsers = db.collection('laborUsers')
    const resp = LaborsUsers.insertOne(req.body)
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


/* GET labor */
async function GetLaborsUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsUsers = db.collection('laborUsers')
    const resp = LaborsUsers.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET labor by id */
async function GetLaborUserById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsUsers = db.collection('laborUsers')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsUsers.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("LaborUser con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a labor by ID*/
async function UpdateLaborUserById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsUsers = db.collection('laborUsers')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsUsers.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("LaborUser con Id especificado no existe")
    }
}

/* DELETE a labor by Id  */
async function DeleteLaborUserById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsUsers = db.collection('laborUsers')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsUsers.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("LaborUser con Id especificado no existe")
    }
    
}



export default { CreateLaborUser, GetLaborsUsers, GetLaborUserById, UpdateLaborUserById, DeleteLaborUserById};