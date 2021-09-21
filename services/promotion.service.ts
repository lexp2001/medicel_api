import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇

/* POST Create a new event */
async function CreatePromotion ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Promotions = db.collection('promotion')
    const resp = Promotions.insertOne(req.body, function (err, result) {
        if (err) {
            res.status(500).send("Erro ao criar o client")
        } else {
            res.status(201)
            res.json(result)
        }
    })

}


/* GET Administrators */
async function GetPromotions ({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Promotions = db.collection('promotion')
    const resp = Promotions.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET Promotion by id */
async function getPromotionById(rut: string,{ req, res }: Context) {
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

/* PUT Update a Client */
async function PutPromotionById(rut: string,{ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const Promotions = db.collection('promotion')
    const newId = new ObjectId(req.params.id)
    const resp = Promotions.findOneAndUpdate(
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
async function DeletePromotionById(rut: string,{ req, res }: Context) {
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

export default { CreatePromotion, GetPromotions, getPromotionById, PutPromotionById, DeletePromotionById };