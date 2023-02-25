const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'Menu Items';

async function collection() {
    const client = await connect();
    return client.db('menuitems').collection(COLLECTIONNAME);
}

const add = async (menuItem) => {
    const db = await collection();
    const result = await db.insertOne(menuItem);
    menuItem._id = result.insertedId;
    return menuItem;
}
 
module.exports = { add }