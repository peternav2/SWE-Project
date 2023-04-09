const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'MenuItems';
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const addMenuItem = async (request) => {
    validateRequest(request);
    const menuItem = request.body
    const db = await collection();
    const result = await db.insertOne(menuItem); // insert the menuItem object into the database
    menuItem._id = result.insertedId; // give the menuItem object an _id property
    return menuItem; // what will be returned in the Promise
}
const getMenuItemById = async (request) => {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const db = await collection();
    const result = await db.findOne({_id: new ObjectId(menuItemId)});
    return result;
}
const getMenuItemsByDate = async(request) => {
    validateRequest(request);
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({date: {year: year, month: month, day: day}, "dish.diningHallId": diningHallId }).toArray();
    return result; // what will be returned in the Promise
}

const getMenuItemsByDiningHall = async(request) => {
    validateRequest(request);
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({"dish.diningHallId": diningHallId}).toArray();
    return result; // what will be returned in the Promise
}

const getMenuItemsByMealTypeByDate = async(request) => {
    validateRequest(request);
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const mealType = request.params.mealType;
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({ date: {year: year, month: month, day: day}, mealType: mealType, "dish.diningHallId": diningHallId}).toArray();
    return result; // what will be returned in the Promise
}

const deleteMenuItem = async (request) => {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(menuItemId) });
    return result; // what will be returned in the Promise (the result of the delete operation
}
module.exports = { addMenuItem, getMenuItemsByDate, getMenuItemsByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById }