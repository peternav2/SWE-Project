const { connect } = require('./mongo.js');
const COLLECTIONNAME = 'University';
const { ObjectId } = require('mongodb');
const {validateRequest} = require('../functions/session.js')

async function collection() { // returns collection we will be CRUDing from 
    const client = await connect();
    return client.db("RateMyDiningHall").collection(COLLECTIONNAME);
}

const getDiningHall = async (request) => {
    validateRequest(request);
    const universityId = request.params.universityId;
    const diningHallId= request.params.diningHallId
    const db = await collection();
    var result = await db.findOne({_id: new ObjectId(universityId)});
    result.diningHalls = formatDininghalls(result.diningHalls)
    return result.diningHalls.find(diningHall => diningHall._id.toString() === diningHallId)
}

function formatDininghalls(diningHalls){
    if(Array.isArray(diningHalls) == false){
        const array = [diningHalls];
        return array
    }
    else{
        return diningHalls
    }
}
//{
//     item: 'journal',
//     status: 'A',
//     size: { h: 14, w: 21, uom: 'cm' },
//     instock: [{ warehouse: 'A', qty: 5 }]
//   },

// input a university name and a dining hall object and it will add the dining hall to the list of dining halls for that university
const addDiningHallToUniversity = async (request) => {
    validateRequest(request);
    const uniId = request.params.universityId
    const diningHall = request.body
    const db = await collection();
    diningHall._id= new ObjectId(); // give the dining hall an _id property
    const result = await db.updateOne(  { _id: new  ObjectId(uniId) },
                                        { $push: { diningHalls: diningHall }})
    return diningHall;      
}

const deleteDiningHallFromUniversity = async (request) => { // input a university name and a dining hall id and it will delete the dining hall from the list of dining halls for that university
    validateRequest(request);
    const uniId = request.params.universityId
    const diningHallId = request.params.diningHallId
    const db = await collection();
    const result = await db.updateOne(  { _id: new ObjectId(uniId) },
                                        { $pull: { diningHalls: { _id: new ObjectId(diningHallId)}}
    })
    return result;
}


module.exports = { addDiningHallToUniversity, deleteDiningHallFromUniversity, getDiningHall }