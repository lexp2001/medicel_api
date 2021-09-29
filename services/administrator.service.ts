import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new administrator */
async function CreateAdministrator({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.insertOne(req.body)
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


/* GET Administrators */
async function getAdministrators({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Administrators = db.collection('administrator')
    const resp = Administrators.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Administrator by id */
async function getAdministratorById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('administrator')
    const newId = new ObjectId(req.params.id)
    const resp = Events.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Administraor con Id especificado no existe")
    }
    
}



/* PUT Update a administrator */
async function PutAdministratorById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Administrators = db.collection('administrator')
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

/* DELETE a administrator by Id  */
async function DeleteAdministratorById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Administrators = db.collection('administrator')
    const newId = new ObjectId(req.params.id)
    const resp = Administrators.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Administraor con Id especificado no existe")
    }
    
}



export default { CreateAdministrator, getAdministrators, getAdministratorById, PutAdministratorById, DeleteAdministratorById};