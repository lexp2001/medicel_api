import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* ☝️  POST Create a new promotion */
async function CreatePromotion({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Promotions = db.collection('promotion')
    const resp = Promotions.insertOne(req.body)
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


/* GET promotions */
async function GetPromotions ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Promotions = db.collection('promotion')
    const resp = Promotions.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Promotion by id */
async function GetPromotionsById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Promotions = db.collection('promotion')
    const newId = new ObjectId(req.params.id)
    const resp = Promotions.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Participant con Id especificado no existe")
    }
    
}

/* ☝️ PUT Update a promotion by ID*/
async function UpdatePromotionById(id: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Promotions = db.collection('promotion')
    const newId = new ObjectId(id)
    const resp = Promotions.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("Promotion con Id especificado no existe")
    }
}

/* DELETE a promotion by Id  */
async function DeletePromotionById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Promotions = db.collection('promotion')
    const newId = new ObjectId(req.params.id)
    const resp = Promotions.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("Promotion con Id especificado no existe")
    }
    
}

export default { CreatePromotion, GetPromotions, GetPromotionsById, UpdatePromotionById, DeletePromotionById };