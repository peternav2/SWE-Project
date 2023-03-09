const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'User';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addUser = async (user) => {
    const db = await collection();
    const result = await db.insertOne(user); // insert the user object into the database
    user._id = result.insertedId; // give the user object an _id property
    return user; // what will be returned in the Promise
}

const getUser = async (username, password) => {
    const db = await collection();
    const result = db.findOne({username: username, password: password});
    return result;
}

module.exports = { addUser, getUser }