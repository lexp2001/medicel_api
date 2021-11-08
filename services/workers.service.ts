import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new worker */
async function CreateWorker({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Workers = db.collection('worker')
    const resp = Workers.insertOne(req.body)
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


/* GET workers */
async function GetWorkers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Workers = db.collection('worker')
    const resp = Workers.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET worker by id */
async function GetWorkerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Workers = db.collection('worker')
    const newId = new ObjectId(req.params.id)
    const resp = Workers.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("worker con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a worker by ID*/
async function UpdateWorkerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Workers = db.collection('worker')
    const newId = new ObjectId(req.params.id)
    const resp = Workers.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("worker con Id especificado no existe")
    }
}

/* DELETE a worker by Id  */
async function DeleteWorkerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Workers = db.collection('worker')
    const newId = new ObjectId(req.params.id)
    const resp = Workers.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("worker con Id especificado no existe")
    }
    
}



export default { CreateWorker, GetWorkers, GetWorkerById, UpdateWorkerById, DeleteWorkerById};