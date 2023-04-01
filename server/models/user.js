const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'User';

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addUser = async (user) => {
    const current_user = await getUserByUsername(user.username)
    if(current_user == null){
        const db = await collection();
        user.universityId = new ObjectId(user.universityId); // convert the universityId string to an ObjectId
        const result = await db.insertOne(user); // insert the user object into the database
        user._id = result.insertedId; // give the user object an _id property
        return user
    }
    return null; // what will be returned in the Promise
}

const getUserByUsernamePassword = async (username, password) => {
    const db = await collection();
    const result = db.findOne({username: username, password: password});
    return result;
}

const getUserByUsername = async (username) => {
    const db = await collection();
    const result = db.findOne({username: username});
    return result;
}

const getUserById = async (userId) => {
    const db = await collection();
    const result = db.findOne({_id: new ObjectId(userId)});
    return result;
}

const deleteUser = async (username, password) => {
    const db = await collection();
    const result = db.deleteOne({username: username, password: password});
    return result;
}

module.exports = { addUser, getUserByUsernamePassword, getUserById, deleteUser, getUserByUsername}