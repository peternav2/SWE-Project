const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'DiningHall';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const add = async (diningHall) => {
    const db = await collection();
    const result = await db.insertOne(diningHall); // insert the diningHall object into the database
    diningHall._id = result.insertedId; // give the diningHall object an _id property
    return diningHall; // what will be returned in the Promise
}

const get = async (id) => {
    const db = await collection();
    const result = await db.findMany(id);
}
module.exports = { add }