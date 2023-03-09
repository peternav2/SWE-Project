const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'MenuItems';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addMenuItem = async (menuItem) => {
    const db = await collection();
    const result = await db.insertOne(menuItem); // insert the menuItem object into the database
    menuItem._id = result.insertedId; // give the menuItem object an _id property
    console.log(menuItem);
    return menuItem; // what will be returned in the Promise
}
module.exports = { addMenuItem }