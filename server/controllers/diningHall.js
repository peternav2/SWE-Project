const express = require('express');
const { deleteDiningHallFromUniversity, addDiningHallToUniversity, getDiningHall } = require('../models/diningHall.js');
const app = express.Router();
const { ObjectId } = require('mongodb');

app
.get('/:universityId/:diningHallId', (req, res) => {
    getDiningHall(req.params.universityId, req.params.diningHallId)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));

})
.post('/:universityId', (req, res) => {
    addDiningHallToUniversity(req.params.universityId, req.body)
    .then(x => res.status(200).send(x))
})
.delete('/:universityId/:diningHallId', (req, res) => {
    deleteDiningHallFromUniversity(req.params.universityId, req.params.diningHallId)
    .then(x => res.status(200).send(x))
})

module.exports = app