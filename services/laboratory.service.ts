import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new laboratory */
async function CreateLaboratory({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Laboratorys = db.collection('laboratory')
    const resp = Laboratorys.insertOne(req.body)
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


/* GET laboratory */
async function GetLaboratorys({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Laboratorys = db.collection('laboratory')
    const resp = Laboratorys.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET laboratory by id */
async function GetLaboratoryById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Laboratorys = db.collection('laboratory')
    const newId = new ObjectId(req.params.id)
    const resp = Laboratorys.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laboratory con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a laboratory by ID*/
async function UpdateLaboratoryById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Laboratorys = db.collection('laboratory')
    const newId = new ObjectId(req.params.id)
    const resp = Laboratorys.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("laboratory con Id especificado no existe")
    }
}

/* DELETE a laboratory by Id  */
async function DeleteLaboratoryById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Laboratorys = db.collection('laboratory')
    const newId = new ObjectId(req.params.id)
    const resp = Laboratorys.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laboratory con Id especificado no existe")
    }
    
}



export default { CreateLaboratory, GetLaboratorys, GetLaboratoryById, UpdateLaboratoryById, DeleteLaboratoryById};