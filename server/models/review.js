const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'MenuItem';
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

async function addReviewToMenuItem(request) {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const review = request.body;
    const db = await collection();
    review.user_Id = new ObjectId(review.user_Id);
    const result = await db.updateOne(
         {_id: new ObjectId(menuItemId)},
         { $push: {"dish.reviews": review}}
        );
    return result;
}

async function updateReview(review, menuItemId) {
    const db = await collection();

    const result = await db.updateOne(
        { _id: new ObjectId(menuItemId), "dish.reviews.user_Id": new ObjectId(review.user_Id)},
        { $set: {"dish.reviews": review}},
    )
    return result;
}

async function updateReview(review, menuItemId) {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const review = request.body;
    const db = await collection();

    const result = await db.updateOne(
        { _id: new ObjectId(menuItemId), "dish.reviews.user_Id": new ObjectId(review.user_Id)},
        { $set: {"dish.reviews": review}},
    )
    return result;
}

async function deleteReview(request) {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const review = request.body;
    const db = await collection();
    const result = await db.updateOne(
        {_id: new ObjectId(menuItemId)},
        { $pull: {"dish.reviews": review}},
    )
    return result;
}

async function getReviewsByMenuItem(request) {
    validateRequest(request);
    const menuItemId = request.params.menuItemId;
    const db = await collection();
    const result = await db.findOne({_id: new ObjectId(menuItemId)})
    return result.dish.reviews;
}

module.exports = { addReviewToMenuItem, deleteReview, getReviewsByMenuItem, updateReview }