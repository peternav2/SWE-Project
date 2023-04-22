const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'MenuItem';
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getAllMenuItems = async(request) => { // returns all menuItem in the database
    validateRequest(request);
    const db = await collection();
    const result = await db.find().toArray();
    return result;
}

const addMenuItem = async (request) => {
    validateRequest(request);
    let menuItem = request.body; // get the menuItem object from the request body
    const db = await collection();

    let menuItem = request.body; // get the menuItem object from the request body

    menuItem.dish.diningHallId = new ObjectId(menuItem.dish.diningHallId);
    console.log("in add menu item");
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
    //validateRequest(request);
    //console.log(request.params);
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({date: {year: +year, month: +month, day: +day}, "dish.diningHallId": new ObjectId(diningHallId) }).toArray();
    //console.log(result);
    return result; // what will be returned in the Promise
}

const getMenuItemsByDiningHall = async(request) => {
    validateRequest(request);
    const diningHallId = request.params.diningHallId;
    const db = await collection();
    const result = await db.find({"dish.diningHallId": new ObjectId(diningHallId)}).toArray();
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
    const result = await db.find({ date: {year: +year, month: +month, day: +day}, mealType: mealType, "dish.diningHallId": new ObjectId(diningHallId)}).toArray();
    return result; // what will be returned in the Promise
}

const deleteMenuItem = async (request) => {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(menuItemId) });
    return result; // what will be returned in the Promise (the result of the delete operation
}

const updateMenuItem = async (menuItem) => {
    const db = await collection();
    const id = new ObjectId(menuItem._id);
    
    delete menuItem._id;
    menuItem.dish.diningHallId = new ObjectId(menuItem.dish.diningHallId);
   
    const result = await db.updateOne({ _id: new ObjectId(id)}, { $set: menuItem });
    return result; // what will be returned in the Promise (the result of the update operation)
}

module.exports = { addMenuItem, getAllMenuItems, getMenuItemsByDate, getMenuItemsByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById, updateMenuItem }