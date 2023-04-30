const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'EventItem';
const { ObjectId } = require('mongodb');
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getEventItemsByDiningHall = async (request) => {
    validateRequest(request);
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({diningHallId: new ObjectId(diningHallId)}).toArray();
    return result;
}

const getEventItemsByDate = async (request) => {
    validateRequest(request);
    const diningHallId = request.params.diningHallId;
    const year = request.params.year
    const day = request.params.day
    const month = request.params.month
    const db = await collection();
    const result = await db.find({diningHallId: new ObjectId(diningHallId), date: {year: +year, month: +month, day: +day}}).toArray();
    return result;
}

const addEventItem = async (request) => {
    validateRequest(request);
    const eventItem = request.body
    const db = await collection();
    eventItem._id = new ObjectId();
    eventItem.diningHallId = new ObjectId(eventItem.diningHallId);
    const result = await db.insertOne(eventItem);
    return eventItem;
}

const deleteEventItem = async (request) => {
    validateRequest(request);
    const eventItemId = request.params.eventItemId;
    const db = await collection();
    const result = await db.deleteOne({_id: new ObjectId(eventItemId)});
    return result;
}

const updateEventItem = async (request) => {
    validateRequest(request);
    const eventItem = request.body
    const db = await collection();
    const id = new ObjectId(eventItem._id);
    delete eventItem._id;
    const result = await db.replaceOne({_id: new ObjectId(id)}, eventItem);
    //i ran into bugs when not deleted the _id property from the eventItem object
    //so i decided to delete it and this will maintain the same _id since it is replacing attributes in database, not _id.
    return result;
}

module.exports = { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem }
