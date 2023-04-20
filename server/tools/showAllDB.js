const { connect } = require('../models/mongo.js');
const { ObjectId } = require('mongodb');
const COLLECTIONNAME_MENUITEM = 'MenuItem';
const COLLECTIONNAME_UNIVERSITY = 'University';
const COLLECTIONNAME_EVENT_ITEM = 'EventItem';
const COLLECTIONNAME_USER = 'User';

// Parse command-line arguments
const args = process.argv.slice(2);
const confirmDeleteAllFlag = args.indexOf('--ALL') >= 0;

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

    const viewAllM = async () => {
        const db = await collection1();
        const result = await db.find().toArray();
        console.log("ALL MENU ITEMS**********************************************************************************************************************************************:\:\n",result);
        return result;
    }

    const viewAllUni = async () => {
        const db = await collection2();
        const result = await db.find().toArray();
        console.log("ALL UNI ITEMS**********************************************************************************************************************************************:\:\n",result);        
        return result;
    }

    const viewAllE = async () => {
        const db = await collection3();
        const result = await db.find().toArray();
        console.log("ALL EVENTS**********************************************************************************************************************************************:\n",JSON.stringify(result,null,4));
        return result;
    }

    const viewAllUser = async () => {
        const db = await collection4();
        const result = await db.find().toArray();
        console.log("ALL USERS**********************************************************************************************************************************************:\:\n",result);
        return result;
    }

    // viewAllUni();
    // viewAllUser();
    viewAllE();
    // viewAllM();
}

