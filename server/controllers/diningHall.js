const express = require('express');
const { add, addDiningHallToUniversity } = require('../models/diningHall.js');
const app = express.Router();
const { ObjectId } = require('mongodb');

app
.post('/', (req, res) => { // this will POST a new dining hall to the database from the request body
    add(req.body)
    .then(x => res.status(200).send(x)); // send the new dining hall back to the client
})
.post('/:universityId', (req, res) => {
    console.log("on post /:universityId");
    addDiningHallToUniversity(req.params.universityId, req.body)
    .then(x => res.status(200).send(x))
    console.log("after addDiningHallToUniversity");
})

module.exports = app