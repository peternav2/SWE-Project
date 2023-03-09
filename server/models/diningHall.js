const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';
const { ObjectId } = require('mongodb');

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


// input a university name and a dining hall object and it will add the dining hall to the list of dining halls for that university
const addDiningHallToUniversity = async (uniId, diningHall) => { 
    const db = await collection();
    diningHall._id= new ObjectId(); // give the dining hall an _id property
    const result = await db.updateOne(  { _id: new  ObjectId(uniId) },
                                        { $push: { diningHalls: diningHall }})
    return diningHall;      
}
module.exports = { add, addDiningHallToUniversity }