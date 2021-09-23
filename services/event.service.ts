import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* POST Create a new event */
async function createEvent({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Events = db.collection('event')
    const resp = Events.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}

/* GET events */
async function getEvents({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Events = db.collection('event')
    const resp = Events.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Event by id */
async function getEventsById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('event')
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


/* PUT Update a event */
async function PutEventById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Administrators = db.collection('event')
    const newId = new ObjectId(req.params.id)
    const resp = Administrators.findOneAndUpdate(
    { "id": (req.params.id) },
    { $set: req.body },
    function (err, item) {
        if (err) throw err
        if (err) {
            res.status(500).send("Error intentando actualizar el usuario")
        } else {
            if (item.value == null) {
                res.status(404).send("Usuario con Id especificado no existe")
            } else {
                res.status(202).json(item.value)
            }
        }
    })
}

/* DELETE a event by Id  */
async function DeleteEventById(rut: string,{ req, res }: Context) {
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




export default { createEvent, getEvents, getEventsById, PutEventById, DeleteEventById};