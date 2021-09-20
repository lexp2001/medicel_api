import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* POST Create a new event */
async function CreateTips ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET Administrators */
async function GetTips({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET tips by id */
async function getTipsById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('tips')
    const newId = new ObjectId(req.params._id)
    const resp = Events.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
    
}

/* PUT Update a Client */
async function PutTipsById({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.findOneAndUpdate(
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

/* DELETE delete a administrator by Id  */
async function DeleteTipsById({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const tips = db.collection('planner')
    const resp = tips.deleteOne(
        {"id": (req.params.id)},
        function (err, result) {
            if (err) {
                res.status(500).send("Error intentando eliminar el usuario")
            } else {
                if (result.deletedCount == 0) {
                    res.status(404).send("Usuario no existe")
                } else {
                    res.status(202).json({ "id": req.params.id })
                }
            }
        })
}

export default { CreateTips, GetTips, getTipsById, PutTipsById, DeleteTipsById};