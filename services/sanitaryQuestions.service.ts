import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new sanitaryQuestions */
async function CreateSanitaryQuestion({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const sanitaryQuestions = db.collection('sanitaryQuestions')
    const resp = sanitaryQuestions.insertOne(req.body)
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


/* GET sanitaryQuestions */
async function GetSanitaryQuestions ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const sanitaryQuestions = db.collection('sanitaryQuestions')
    const resp = sanitaryQuestions.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET sanitaryQuestions by id */
async function GetSanitaryQuestionById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const sanitaryQuestions = db.collection('sanitaryQuestions')
    const newId = new ObjectId(req.params.id)
    const resp = sanitaryQuestions.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
    
}

/* ☝️ PUT Update a sanitaryQuestions by ID*/
async function UpdateSanitaryQuestionById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const SanitaryQuestions = db.collection('sanitaryQuestions')
    const newId = new ObjectId(req.params.id)
    const resp = SanitaryQuestions.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("sanitaryQuestion con Id especificado no existe")
    }
}

/* DELETE a sanitaryQuestions by Id  */
async function DeleteSanitaryQuestionById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const sanitaryQuestions = db.collection('sanitaryQuestions')
    const newId = new ObjectId(req.params.id)
    const resp = sanitaryQuestions.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("sanitaryQuestion con Id especificado no existe")
    }
    
}

export default { CreateSanitaryQuestion, GetSanitaryQuestions, GetSanitaryQuestionById, UpdateSanitaryQuestionById,  DeleteSanitaryQuestionById};