const express = require('express');
const { add, addDiningHallToUniversity } = require('../models/diningHall.js');
const app = express.Router();
const { ObjectId } = require('mongodb');

app
.post('/:universityId', (req, res) => {
    addDiningHallToUniversity(req.params.universityId, req.body)
    .then(x => res.status(200).send(x))
})
.delete('/:universityId/:diningHallId', (req, res) => {
    deleteDiningHallFromUniversity(req.params.universityId, req.params.diningHallId)
    .then(x => res.status(200).send(x))
})

module.exports = app