import { MongoClient, ObjectId} from 'mongodb'


const config = {
    url: "mongodb://root:TakkSkalDuHa2021%21@40.114.126.15:27018/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
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