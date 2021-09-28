import { MongoClient, ObjectId} from 'mongodb'


const config = {
    url: "mongodb://medicel-mongo:kLCaIGaMwVNGf9lquRKPcIvKxlmePpid8ICgz4NwZApspPamXftKplFk4y1QUYe6OGjXryXg01GFJeRkV3kzow%3D%3D@medicel-mongo.mongo.cosmos.azure.com:10255/?authSource=admin&replicaSet=globaldb&maxIdleTimeMS=120000&readPreference=primary&appname=%40medicel-mongo%40&retryWrites=false&ssl=true",
    dbName: "medicel"
  };
  
  async function createConnection() {
    const connection = await MongoClient.connect(config.url)
    const db = connection.db(config.dbName);
    return {
      connection,
      db,
      ObjectId
    };
  }

export { createConnection };