const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'EventItem';
const { ObjectId } = require('mongodb');

async function collection() { // returns collection we will be CRUDing from
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getEventItemsByDiningHall = async (diningHallId) => {
    const db = await collection();
    const result = await db.find({diningHallId: diningHallId}).toArray();
    return result;
}

const getEventItemsByDate = async (diningHallId, month, day, year) => {
    const db = await collection();
    const result = await db.find({diningHallId: diningHallId, date: {year: year, month: month, day: day}}).toArray();
    return result;
}

const addEventItem = async (diningHallId, eventItem) => {
    const db = await collection();
    eventItem._id = new ObjectId();
    eventItem.diningHallId = diningHallId;
    const result = await db.insertOne(eventItem);
    return eventItem;
}

const deleteEventItem = async (eventItemId) => {
    const db = await collection();
    const result = await db.deleteOne({_id: new ObjectId(eventItemId)});
    return result;
}

const updateEventItem = async (eventItemId, eventItem) => {
    const db = await collection();
    const result = await db.updateOne({_id: new ObjectId(eventItemId)}, {$set: eventItem});
    return result;
}

module.exports = { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem }