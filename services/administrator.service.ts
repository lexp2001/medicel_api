import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* POST Create a new event */
async function CreateAdministrator ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET Administrators */
async function getAdministrators({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Participant by id */
async function getAdministratorsById(rut: string,{ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.findOne({_id : (req.params._id)},
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
async function PutAdministratorById({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
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

/* DELETE delete a administrator by Id  */
async function deleteAdministratorById({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.deleteOne(
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



export default { CreateAdministrator, getAdministrators, getAdministratorsById, PutAdministratorById, deleteAdministratorById};