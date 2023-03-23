const express = require('express');
const app = express.Router();
const { getEventItemsByDiningHall, getEventItemsByDate, addEventItem, deleteEventItem, updateEventItem } = require('../models/eventItem.js');


app
.get('/:diningHallId', (req, res) => {
    getEventItemsByDiningHall(req.params.diningHallId)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.get('/:diningHallId/:month/:day/:year', (req, res) => {
    getEventItemsByDate(req.params.diningHallId, req.params.month, req.params.day, req.params.year)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.post('/:diningHallId', (req, res) => {
    addEventItem(req.params.diningHallId, req.body)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.delete('/:eventItemId', (req, res) => {
    deleteEventItem(req.params.eventItemId)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.patch('/:eventItemId', (req, res) => {
    updateEventItem(req.params.eventItemId, req.body)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})

module.exports = app