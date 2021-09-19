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

/* GET Participant by id */
async function GetTipsById(rut: string,{ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Tips = db.collection('tips')
    const resp = Tips.findOne({_id : (req.params._id)},
    function (err, result) {
        if (err) throw err
        if (result) {
            res.json(result)
        } else {
            res.status(204).send()
        }
    })
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

export default { CreateTips, GetTips, GetTipsById, PutTipsById, DeleteTipsById};