const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';
const { ObjectId } = require('mongodb');

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}


// input a university name and a dining hall object and it will add the dining hall to the list of dining halls for that university
const addDiningHallToUniversity = async (uniId, diningHall) => { 
    const db = await collection();
    diningHall._id= new ObjectId(); // give the dining hall an _id property
    const result = await db.updateOne(  { _id: new  ObjectId(uniId) },
                                        { $push: { diningHalls: diningHall }})
    return diningHall;      
}

const deleteDiningHallFromUniversity = async (uniId, diningHallId) => { // input a university name and a dining hall id and it will delete the dining hall from the list of dining halls for that university
    const db = await collection();
    const result = await db.updateOne(  { _id: new ObjectId(uniId) },
                                        { $pull: { diningHalls: { _id: new ObjectId(diningHallId)}}
    })
    return result;
}


module.exports = { addDiningHallToUniversity, deleteDiningHallFromUniversity }