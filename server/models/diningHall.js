const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';

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
const addDiningHallToUniversity = async (universityName, diningHall) => { 
    const db = await collection();
    const result = await db.updateOne(  { name: universityName },
                                        { $push: { diningHalls: diningHall }})
    return result;      
}
module.exports = { add, addDiningHallToUniversity }