const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'User';
const {encrypt} = require('../functions/hash.js')
const {generateSession, validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addUser = async (request) => {
    const user = request.body;
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

//Create a new user with encrypted password.
const addUserTokenized = async (request) => {
    const user = request.body;
    const current_user = await getUserByUsername(user.username)
    if(current_user == null){
        user.password = encrypt(user.password)
        const db = await collection();
        user.universityId = new ObjectId(user.universityId); // convert the universityId string to an ObjectId
        const result = await db.insertOne(user); // insert the user object into the database
        user._id = result.insertedId; // give the user object an _id property
        return user
    }
    return null; // what will be returned in the Promise
}

const getUserByUsernamePassword = async (request) => {
    const username = request.params.username;
    const password = request.params.password;
    const db = await collection();
    const result = db.findOne({username: username, password: password});
    return result;
}

//Login
const getUserByUsernamePasswordTokenized = async (request) => {
    var password =  encrypt(request.params.password);
    const username = request.params.username;
    const db = await collection();
    const result = await db.findOne({username: username, password: password});
    result.session = generateSession(username, result.isStudent)
    return result;
}

const getUserByUsername = async (request) => {
    const username = request.params.username;
    const db = await collection();
    const result = db.findOne({username: username});
    return result;
}

const getUserById = async (request) => {
    const userId = request.params.userId;
    const db = await collection();
    const result = db.findOne({_id: new ObjectId(userId)});
    return result;
}

const deleteUser = async (request) => {
    validateRequest(request);
    const username = request.params.username;
    const password = request.params.password;
    const db = await collection();
    const result = db.deleteOne({username: username, password: password});
    return result;
}

module.exports = { addUser, addUserTokenized, getUserByUsernamePassword, getUserByUsernamePasswordTokenized, getUserById, deleteUser, getUserByUsername}