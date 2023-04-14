const express = require('express');
const app = express.Router();
const { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem } = require('../models/eventItem.js');
const { ObjectId } = require('mongodb');
const {getErrorTuple} = require('../functions/session.js')

app
.delete('/:menuItemId', (req, res) => {
    deleteEventItem(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})
.get('/:diningHallId', (req, res) => {
    getEventItemsByDiningHall(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})
.get('/:diningHallId/:month/:day/:year', (req, res) => {
    getEventItemsByDate(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})
.post('/', (req, res) => {
    addEventItem(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})
.delete('/:diningHallId', (req, res) => {
    deleteEventItem(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})
.patch('/', (req, res) => {
    updateEventItem(req)
        .then(x => res.status(200).send(x))
        .catch(err => {const error = getErrorTuple(err.message)
            res.status(error[0]).send(error[1])});
})

module.exports = app