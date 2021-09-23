import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* POST Create a new planner */
async function createPlanner ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Planners = db.collection('planner')
    const resp = Planners.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET planners */
async function getPlanners({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Planners = db.collection('planner')
    const resp = Planners.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET planner by id */
async function GetPlannerById(rut: string,{ req, res }: Context) {
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

/* PUT Update a planner */
async function PutPlannerById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Planners = db.collection('planner')
    const newId = new ObjectId(req.params.id)
    const resp = Planners.findOneAndUpdate(
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

/* DELETE a planner by Id  */
async function DeletePlannerById(rut: string,{ req, res }: Context) {
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


export default { createPlanner, getPlanners, GetPlannerById, PutPlannerById, DeletePlannerById};