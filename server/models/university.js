const { connect } = require('./mongo.js');
const {ObjectId} = require("mongodb");
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
    return result;
}

const addUniversity = async(university) => {
    const db = await collection();
    const result = await db.insertOne(university);
    return result;
}

const updateUniversity = async(university) => {
    const db = await collection();
    const id = new ObjectId(university._id);
    delete university._id;
    const result = await db.updateOne({_id: new ObjectId(id)}, {$set: university});
    return result;
}

const deleteUniversity = async(universityId) => {
    const db = await collection();
    const result = await db.deleteOne({_id: new ObjectId(universityId)});
    return result;
}

module.exports = { getAllUniversities, addUniversity, deleteUniversity, getUniversity, updateUniversity }