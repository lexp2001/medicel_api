import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* POST Create a new user */
async function CreateUser ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Users = db.collection('users')
    const resp = Users.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET users */
async function GetUsers({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Users = db.collection('users')
    const resp = Users.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET users by id */
async function getUsersById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('users')
    const newId = new ObjectId(req.params.id)
    const resp = Events.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
    
}

/* PUT Update a user */
async function PutUserById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const users = db.collection('users')
    const newId = new ObjectId(req.params.id)
    const resp = users.findOneAndUpdate(
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

/* DELETE a user by Id  */
async function DeleteUserById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Users = db.collection('users')
    const newId = new ObjectId(req.params.id)
    const resp = Users.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("User con Id especificado no existe")
    }
    
}

export default { CreateUser, GetUsers, getUsersById, PutUserById, DeleteUserById};