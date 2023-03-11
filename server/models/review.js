const { connect } = require('./mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME = 'MenuItems';

async function collection() { // returns collection we will be CRUDing from
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

async function addReviewToMenuItem(review, menuItemId) {
    const db = await collection();
    const result = await db.updateOne(
         {_id: new ObjectId(menuItemId)},
         { $push: {"dish.reviews": review}}
        );
    return result;
}

async function deleteReview(review, menuItemId) {
    const db = await collection();
    const result = await db.updateOne(
        {_id: new ObjectId(menuItemId)},
        { $pull: {"dish.reviews": review}},
    )
    return result;
}


async function getReviewsByMenuItem(menuItemId) {
    const db = await collection();
    const result = await db.findOne({_id: new ObjectId(menuItemId)})
    return result.dish.reviews;
}




module.exports = { addReviewToMenuItem, deleteReview, getReviewsByMenuItem }