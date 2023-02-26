const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'MenuItems';

async function collection() {
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const add = async (menuItem) => {
    console.log('adding');
    const db = await collection();
    const result = await db.insertOne({item: "box", qty: 20 } );
    menuItem._id = result.insertedId;
    return menuItem;
}
 
module.exports = { add }