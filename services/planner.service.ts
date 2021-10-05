import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new event */
async function CreatePlanner({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Planners = db.collection('planner')
    const resp = Planners.insertOne(req.body)
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


/* GET planners */
async function GetPlanners({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Planners = db.collection('planner')
    const resp = Planners.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET planner by id */
async function GetPlannerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Planners = db.collection('planner')
    const newId = new ObjectId(req.params.id)
    const resp = Planners.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Planner con Id especificado no existe")
    }
    
}

/* ☝️ PUT Update a planner by ID*/
async function UpdatePlannerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Planners = db.collection('planner')
    const newId = new ObjectId(req.params.id)
    const resp = Planners.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Planner con Id especificado no existe")
    }
}

/* DELETE a planner by Id  */
async function DeletePlannerById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Planners = db.collection('planner')
    const newId = new ObjectId(req.params.id)
    const resp = Planners.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Planner con Id especificado no existe")
    }
    
}


export default { CreatePlanner, GetPlanners, GetPlannerById, UpdatePlannerById, DeletePlannerById};