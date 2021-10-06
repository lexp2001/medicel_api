import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new labor */
async function CreateLabor({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Labors = db.collection('labor')
    const resp = Labors.insertOne(req.body)
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
async function GetLabors({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Labors = db.collection('labor')
    const resp = Labors.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET labor by id */
async function GetLaborById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Labors = db.collection('labor')
    const newId = new ObjectId(req.params.id)
    const resp = Labors.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Labor con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a labor by ID*/
async function UpdateLaborById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Labors = db.collection('labor')
    const newId = new ObjectId(req.params.id)
    const resp = Labors.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Labor con Id especificado no existe")
    }
}

/* DELETE a labor by Id  */
async function DeleteLaborById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Labors = db.collection('labor')
    const newId = new ObjectId(req.params.id)
    const resp = Labors.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Labor con Id especificado no existe")
    }
    
}



export default { CreateLabor, GetLabors, GetLaborById, UpdateLaborById, DeleteLaborById};