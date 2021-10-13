import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new labor */
async function CreateLaborTest({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsTests = db.collection('laborTests')
    const resp = LaborsTests.insertOne(req.body)
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


/* GET labor */
async function GetLaborsTests({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsTests = db.collection('laborTests')
    const resp = LaborsTests.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET labor by id */
async function GetLaborTestById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsTests = db.collection('laborTests')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsTests.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laborTest con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a labor by ID*/
async function UpdateLaborTestById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsTests = db.collection('laborTests')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsTests.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("laborTest con Id especificado no existe")
    }
}

/* DELETE a labor by Id  */
async function DeleteLaborTestById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsTests = db.collection('laborTests')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsTests.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laborTest con Id especificado no existe")
    }
    
}



export default { CreateLaborTest, GetLaborsTests, GetLaborTestById, UpdateLaborTestById, DeleteLaborTestById};