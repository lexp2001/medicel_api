import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new event */
async function CreateEvent({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Events = db.collection('event')
    const resp = Events.insertOne(req.body)
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
async function GetEvents({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Events = db.collection('event')
    const resp = Events.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Event by id */
async function GetEventsById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('event')
    console.info()
    const newId = new ObjectId(req.params.id)
    const resp = Events.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Event con Id especificado no existe")
    }
    
}


/* ☝️ PUT Update a event by ID*/
async function UpdateEventById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('event')
    const newId = new ObjectId(req.params.id)
    const resp = Events.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Event con Id especificado no existe")
    }
}

/* DELETE a event by Id  */
async function DeleteEventById({ req, res }: Context) {
    const id = req.params.id
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('event')
    const newId = new ObjectId(req.params.id)
    const resp = Events.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Administraor con Id especificado no existe")
    }
    
}




export default { CreateEvent, GetEvents, GetEventsById, UpdateEventById, DeleteEventById};