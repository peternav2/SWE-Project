const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

addDayToDiningHall = async (universityName, diningHallName, day) => {
    const db = await collection();
    const result = await db.updateOne(  
        {"name": universityName, "diningHalls.name": diningHallName},
        { $push: { "diningHalls.$.days": day }})
    return result;

        // const result = await db.updateOne(  { name: universityName },
        //     { $push: { diningHalls: diningHall }})
    // db.collection.updateOne(
    //     {"variants.items._id" :  "62be0271d373b2f2fc1826a8"},
    //     {$set: {
    //         'variants.$[].items.$[xxx].quantity': 999
    //     }},
    //     {arrayFilters: [
    //         {"xxx._id": '62be0271d373b2f2fc1826a8'}
    //     ]}
};

module.exports = { addDayToDiningHall }