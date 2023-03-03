const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getAll = async () => {
    const db = await collection();
    const result = await db.find().toArray();
    console.log(result);
    console.log("after find in model")
    return result;
}

const add = async(university) => {
    const db = await collection();
    const result = await db.insertOne(university);
    return result;
}

module.exports = { getAll, add }