import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'
var ObjectId = require('mongodb').ObjectId;


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
async function GetParticipantByRut({ req, res }: Context) {
    const rut = req.params.rut
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
async function GetParticipantByEmail({ req, res }: Context) {
    const email = req.params.email
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

/* 👍 ParticipantLogin */
async function ParticipantLogin({ req, res }: Context) {
    const email = req.body.email
    const pass = req.body.password
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
            'email': email,
            'password': pass
        }
    },
    ])
    const body = await resp.toArray()
    connection.close()
    if (body.length>0) {
        res.status(200).json(body[0])
    } else {
        res.status(404).send("Senha incorreta")
    }
}

/* GET Participant by id */
async function GetParticipantById({ req, res }: Context) {
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

/*  PUT Update a participant by ID*/
async function UpdateParticipantById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const newId = new ObjectId(req.params.id)
    const resp = Participants.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
}

/*  👍 PUT Update a participant by RUT*/
async function UpdateParticipantByRut({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const newRut = req.params.rut
    var payload = req.body
    delete payload._id
    const resp = Participants.findOneAndUpdate({'rut': newRut }, {$set: payload})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Administraor con Id especificado no existe")
    }
}

/* GET getParticipantWithSQuestions */
async function GetParticipantsWithSQuestions({ req, res }: Context) {
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
    const newRut = req.params.rut
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.deleteOne({ 'rut': newRut })
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }

}

/* DELETE a administrator by Id  */
async function DeleteParticipantById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Participants = db.collection('participant')
    const newId = new ObjectId(req.params.id)
    const resp = Participants.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Administraor con Id especificado no existe")
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
    GetParticipantByEmail,
    ParticipantLogin
};