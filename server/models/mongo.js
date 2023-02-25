require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;


const client = new MongoCleint(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: {version: ServerApiVersion.v1}});

module.exports = {
    connect: () => client.connect()
}