import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'
var ObjectId = require('mongodb').ObjectId;


// This was async function getParticipants(req: Request, res: Response) {
// 👇


/* 👍 POST Create a new participant */
async function CreateParticipant({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.insertOne(req.body)
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


/* 👍 GET Participants */
async function GetParticipants({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* 👍 GET Participant by Rut */
async function GetParticipantByRut(rut: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.aggregate([{
        '$lookup': {
            'from': 'sanitaryQuestions',
            'localField': 'rut',
            'foreignField': 'rut',
            'as': 'sQuestions'
        }
    }, {
        '$match': {
            'rut': rut
        }
    },
    ])
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* 👍 GET Participant by email */
async function GetParticipantByEmail(email: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.aggregate([{
        '$lookup': {
            'from': 'sanitaryQuestions',
            'localField': 'rut',
            'foreignField': 'rut',
            'as': 'sQuestions'
        }
    }, {
        '$match': {
            'email': email
        }
    },
    ])
    const body = await resp.toArray()
    connection.close()
    if (body.length>0) {
        res.status(200).json(body[0])
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
}

/* GET Participant by id */
async function GetParticipantById(rut: string, { req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('participant')
    const newId = new ObjectId(req.params.id)
    const resp = Events.findOne({ '_id': newId })
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }

}

/* GET getParticipantStartTotal Ler organizações com filtros e ordem alfabética */
async function GetParticipantStartTotal({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.aggregate([{
        '$skip': (Number(req.params.start))
    }, {
        '$limit': (Number(req.params.total))
    },
    {
        '$lookup': {
            'from': 'sanitaryQuestions',
            'localField': 'rut',
            'foreignField': 'rut',
            'as': 'sQuestions'
        }
    },
    ])

    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* ☝️ PUT Update a participant by ID */
async function UpdateParticipantById(_id: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const newId = new ObjectId(req.params.id)
    const resp = Participants.findOneAndUpdate(
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

/* ☝️ PUT Update a participant by RUT */
async function UpdateParticipantByRut(rut: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participant = db.collection('participant')
    delete req.body._id
    const resp = Participant.findOneAndUpdate(
        { "rut": rut },
        { $set: req.body })
    var body = null
    try {
        body = await resp
        connection.close()
        if (body.value == null) {
            res.status(400).json(body)
        } else {
            res.status(201).json(body)
        }

    } catch (error) {
        connection.close()
        res.status(500).json(error)
    }
}

/* GET getParticipantWithSQuestions */
async function GetParticipantsWithSQuestions(rut: string, { req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.aggregate([{
        '$lookup': {
            'from': 'sanitaryQuestions',
            'localField': 'rut',
            'foreignField': 'rut',
            'as': 'sQuestions'
        }
    }])

    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* GET get-participant-with-s-questions/:orderBy/:byComunity/:sk/:lm */
async function GetParticipantsByOrderByComunitySkLm({ req, res }: Context) {
    var order = req.params.ByOrder
    var comun = req.params.ByComunity
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.aggregate([{
        '$skip': (Number(req.params.sk))
    }, {
        '$limit': (Number(req.params.lm))
    },
    {
        '$lookup': {
            'from': 'sanitaryQuestions',
            'localField': 'rut',
            'foreignField': 'rut',
            'as': 'sQuestions'
        }
    }, {
        '$match': {
            'comunity': comun
        }
    }, {
        '$sort': {
            [order]: 1
        }
    }
    ])

    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)
}

/* DELETE a participant by rut  */
async function DeleteParticipantByRut({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.deleteOne(
        { "rut": (req.params.rut) },
        function (err, result) {
            if (err) {
                res.status(500).send("Error intentando eliminar el usuario")
            } else {
                if (result.deletedCount == 0) {
                    res.status(404).send("Usuario no existe")
                } else {
                    res.status(202).json({ "rut": req.params.rut })
                }
            }
        })
}

/* DELETE a participant by Id  */
async function DeleteParticipantById(rut: string, { req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const newId = new ObjectId(req.params.id)
    const resp = Participants.deleteOne({ '_id': newId })
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }

}

export default {
    GetParticipants,
    GetParticipantByRut,
    GetParticipantsWithSQuestions,
    GetParticipantById,
    GetParticipantsByOrderByComunitySkLm,
    GetParticipantStartTotal,
    CreateParticipant,
    DeleteParticipantById,
    DeleteParticipantByRut,
    UpdateParticipantByRut,
    UpdateParticipantById,
    GetParticipantByEmail
};