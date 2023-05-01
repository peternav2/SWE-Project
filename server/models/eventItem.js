const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'EventItem';
const { ObjectId } = require('mongodb');
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addReviewToEventItem = async (request) => {
    validateRequest(request);
    const eventItemId = request.params.eventItemId;
    const review = request.body;
    const db = await collection();
    review.user_Id = new ObjectId(review.user_Id);
    const result = await db.updateOne(
         {_id: new ObjectId(eventItemId)},
         { $push: {"reviews": review}}
        );    
    return result;
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
    // console.log(diningHallId,year,day,month);
    const result = await db.find({diningHallId: new ObjectId(diningHallId), date: {year: +year, month: +month, day: +day}}).toArray();
    // console.log(result);
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
    //don't think I'm adding the patch permissions right.......................
    // validateRequest(request);
    const eventItem = request.body;
    const db = await collection();
    eventItem.diningHallId =  new ObjectId(eventItem.diningHallId);
    eventItem._id =  new ObjectId(eventItem._id);
    const result = await db.replaceOne({_id: eventItem._id}, eventItem);
    return result;
}

module.exports = { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem, addReviewToEventItem }
