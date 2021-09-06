import { Context } from '@azure/functions'
import { createConnection } from '../shared/mongo'


// This was async function getParticipants(req: Request, res: Response) {
// 👇
async function getParticipants({ req, res }: Context) {
    const { db, connection } = await createConnection()
    const Participants = db.collection('participant')
    const resp = Participants.find({})
    const body = await resp.toArray()
    connection.close()
    res.status(200).json(body)

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

export default { getParticipants, postParticipant, putParticipant, deleteParticipant };