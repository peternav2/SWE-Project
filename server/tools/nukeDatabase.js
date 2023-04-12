const { connect } = require('../models/mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME_MENUITEM = 'MenuItem';
const COLLECTIONNAME_UNIVERSITY = 'University';
const COLLECTIONNAME_EVENT_ITEM = 'EventItem';
const COLLECTIONNAME_USER = 'User';

// Parse command-line arguments
const args = process.argv.slice(2);
const confirmDeleteAllFlag = args.indexOf('--YES-I_WANT_TO_DELETE_ALL_DATA') >= 0;

// This "short circuits" through the server to delete EVERYTHING from the database.
if (confirmDeleteAllFlag) {
    async function collection1() { // returns collection we will be CRUDing from 
        const client = await connect();
        return client.db("RateMyDiningHall").collection(COLLECTIONNAME_MENUITEM);
    }

    async function collection2() { // returns collection we will be CRUDing from 
        const client = await connect();
        return client.db("RateMyDiningHall").collection(COLLECTIONNAME_UNIVERSITY);
    }

    async function collection3() { // returns collection we will be CRUDing from 
        const client = await connect();
        return client.db("RateMyDiningHall").collection(COLLECTIONNAME_EVENT_ITEM);
    }

    async function collection4() { // returns collection we will be CRUDing from 
        const client = await connect();
        return client.db("RateMyDiningHall").collection(COLLECTIONNAME_USER);
    }

    const deleteAllMenuItem = async () => {
        const db = await collection1();
        await db.deleteMany({});
        const result = await db.find().toArray();
        return result;
    }

    const deleteAllUniversity = async () => {
        const db = await collection2();
        await db.deleteMany({});
        const result = await db.find().toArray();
        return result;
    }

    const deleteAllEventItem = async () => {
        const db = await collection3();
        await db.deleteMany({});
        const result = await db.find().toArray();
        return result;
    }

    const deleteAllUser = async () => {
        const db = await collection4();
        await db.deleteMany({});
        const result = await db.find().toArray();
        return result;
    }
}