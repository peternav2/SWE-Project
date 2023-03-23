const express = require('express');
const app = express.Router();
const { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem } = require('../models/eventItem.js');
const { ObjectId } = require('mongodb');


app
.delete('/:menuItemId', (req, res) => {
    deleteEventItem(req.params.menuItemId)
        .then(x => res.status(200).send(x))
        .catch(err => res.status(404).send(err));
})
.get('/:diningHallId', (req, res) => {
    getEventItemsByDiningHall(req.params.diningHallId)
    .then(x => res.status(200).send(x))
})
.get('/:diningHallId/:month/:day/:year', (req, res) => {
    getEventItemsByDate(req.params.diningHallId, +req.params.month, +req.params.day, +req.params.year)
    .then(x => res.status(200).send(x))
})
.post('/', (req, res) => {
    addEventItem(req.body)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.delete('/:diningHallId', (req, res) => {
    deleteEventItem(req.params.diningHallId)
        .then(x => res.status(200).send(x))
        .catch(err => res.status(404).send(err));
})
.patch('/', (req, res) => {
    updateEventItem(req.body)
    .then(x => res.status(200).send(x))
})

module.exports = app