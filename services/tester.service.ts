import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new tester */
async function CreateTester({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Testers = db.collection('tester')
    const resp = Testers.insertOne(req.body)
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


/* GET Tester */
async function GetTesters({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Testers = db.collection('tester')
    const resp = Testers.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET tester by id */
async function GetTesterById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Testers = db.collection('tester')
    const newId = new ObjectId(req.params.id)
    const resp = Testers.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Tester con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a tester by ID*/
async function UpdateTesterById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Testers = db.collection('tester')
    const newId = new ObjectId(req.params.id)
    const resp = Testers.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Tester con Id especificado no existe")
    }
}

/* DELETE a tester by Id  */
async function DeleteTesterById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Testers = db.collection('tester')
    const newId = new ObjectId(req.params.id)
    const resp = Testers.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Tester con Id especificado no existe")
    }
    
}



export default { CreateTester, GetTesters, GetTesterById, UpdateTesterById, DeleteTesterById};