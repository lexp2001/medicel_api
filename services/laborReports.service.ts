import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


/* ☝️  POST Create a new labor */
async function CreateLaborReport({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsReports = db.collection('laborReports')
    const resp = LaborsReports.insertOne(req.body)
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
async function GetLaborsReports({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const LaborsReports = db.collection('laborReports')
    const resp = LaborsReports.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json( body)

}

/* GET labor by id */
async function GetLaborReportById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsReports = db.collection('laborReports')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsReports.findOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laborReport con Id especificado no existe")
    }
    
}



/* ☝️ PUT Update a labor by ID*/
async function UpdateLaborReportById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsReports = db.collection('laborReports')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsReports.findOneAndUpdate({'_id': newId }, {$set: req.body})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json(body)
    } else {
        res.status(404).send("laborReport con Id especificado no existe")
    }
}

/* DELETE a labor by Id  */
async function DeleteLaborReportById({ req, res }: Context) {
    const { db, connection, ObjectId } = await createConnection()
    const LaborsReports = db.collection('laborReports')
    const newId = new ObjectId(req.params.id)
    const resp = LaborsReports.deleteOne({'_id' : newId})
    const body = await resp
    connection.close()
    if (body) {
        res.status(200).json( body)
    } else {
        res.status(404).send("laborReport con Id especificado no existe")
    }
    
}



export default { CreateLaborReport, GetLaborsReports, GetLaborReportById, UpdateLaborReportById, DeleteLaborReportById};