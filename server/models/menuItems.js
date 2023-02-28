const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'MenuItems';

async function collection() {
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const add = async (menuItem) => {
    console.log('adding');
    const db = await collection();
    const result = await db.insertOne(menuItem);
    menuItem._id = result.insertedId;
    return menuItem;
}
// const add = async (menuItem) => {
//     console.log('adding');
//     const db = await collection();
//     const result = await db.insertOne({item: "box", qty: 20 } );
//     menuItem._id = result.insertedId;
//     return menuItem;
// }
// above function works but i dont know why the other one doesnt work
module.exports = { add }