const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getAllUniversities = async () => {
    const db = await collection();
    const result = await db.find().toArray();
    return result;
}

const getUniversity = async(universityId) => {
    const db = await collection();
    const result = await db.findOne({_id: new ObjectId(universityId)});
}

const addUniversity = async(university) => {
    const db = await collection();
    const result = await db.insertOne(university);
    return result;
}

const deleteUniversity = async(universityId) => {
    const db = await collection();
    const result = await db.deleteOne({_id: new ObjectId(universityId)});
    return result;
}

module.exports = { getAllUniversities, addUniversity, deleteUniversity, getUniversity }