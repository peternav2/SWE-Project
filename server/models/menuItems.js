const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'MenuItems';

async function collection() {
    const client = await connect();
    return client.db().collection(COLLECTIONNAME);
}

const add = async (menuItem) => {
    const db = await collection();
    const result = await db.insertOne(menuItem);
    console.log('inserted');
    return result.insertedId;
}
 
module.exports = { add }