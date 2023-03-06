const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'MenuItem';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const add = async (menuItem) => {
    console.log('adding');
    const db = await collection();
    const result = await db.insertOne(menuItem); // insert the menuItem object into the database
    menuItem._id = result.insertedId; // give the menuItem object an _id property
    return menuItem; // what will be returned in the Promise
}
module.exports = { add }