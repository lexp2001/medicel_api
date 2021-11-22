import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'

/* 👍 GET Faenas */
async function GetFaenas({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Faenas = db.collection('faena')
    const resp = Faenas.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}





export default { GetFaenas };