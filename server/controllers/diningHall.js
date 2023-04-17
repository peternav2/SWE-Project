const express = require('express');
const { deleteDiningHallFromUniversity, addDiningHallToUniversity, getDiningHall } = require('../models/diningHall.js');
const app = express.Router();
const { ObjectId } = require('mongodb');
const {getErrorTuple} = require('../functions/session.js')

app
.get('/:universityId/:diningHallId', (req, res) => {
    getDiningHall(req).then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.post('/:universityId', (req, res) => {
    addDiningHallToUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.delete('/:universityId/:diningHallId', (req, res) => {
    deleteDiningHallFromUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})

module.exports = app