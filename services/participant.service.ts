import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'
var ObjectId = require('mongodb').ObjectId;


// This was async function getParticipants(req: Request, res: Response) {
// 👇


/* POST Create a new participant */
async function createParticipant({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET Participants */
async function getParticipants({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Participant by Rut */
async function getParticipantByRut(rut: string,{ req, res }: Context) {
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
    res.status(200).json( body)

}

/* GET Participant by id */
async function getParticipantById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Events = db.collection('participant')
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

/* GET get-organization/:start/:total Ler organizações com filtros e ordem alfabética */
async function getParticipantStartTotal({ req, res }: Context) {
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
    res.status(200).json( body)
}

/* PUT Update a Client */
async function PutParticipantByRut({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.findOneAndUpdate(
        { "rut": (req.params.rut) },
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

/* GET getParticipantWithSQuestions */
async function getParticipantsWithSQuestions(rut: string,{ req, res }: Context) {
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
    res.status(200).json( body)
}

/* GET get-participant-with-s-questions/:orderBy/:byComunity/:sk/:lm */
async function getParticipantsByOrderByComunitySkLm({ req, res }: Context) {
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
    res.status(200).json( body)
}

/* DELETE delete a participant by rut  */
async function deleteParticipantByRut({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.deleteOne(
        {"rut": (req.params.rut)},
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

/* DELETE delete a participant by Id  */
async function deleteParticipantById({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.deleteOne(
        {"_id": (req.params.id)},
        function (err, result) {
            if (err) {
                res.status(500).send("Error intentando eliminar el usuario")
            } else {
                if (result.deletedCount == 0) {
                    res.status(404).send("Usuario no existe")
                } else {
                    res.status(202).json({ "rut": req.params.id })
                }
            }
        })
        
}


// This was async function postVacation(req: Request, res: Response) {
// 👇
async function postParticipant({ req, res }: Context) {
    // ...
}

// async function putVacation(req: Request, res: Response) {
// 👇
async function putParticipant({ req, res }: Context) {
    // ...
}

// This was async function deleteVacation(req: Request, res: Response) {
// 👇
async function deleteParticipant({ req, res }: Context) {
    // ...
}

export default { getParticipants, getParticipantByRut, getParticipantsWithSQuestions, getParticipantById, getParticipantsByOrderByComunitySkLm, getParticipantStartTotal, createParticipant, deleteParticipantById, deleteParticipantByRut, postParticipant, putParticipant, PutParticipantByRut, deleteParticipant };