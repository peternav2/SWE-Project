require('dotenv').config(); // allows use of .env files for environment variables
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI; // I will give you the .env file to get this


const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: {version: ServerApiVersion.v1}}); // init client from the database created for this project

module.exports = {
    connect: () => client.connect() // export a connect function to allow server to connect to database
}