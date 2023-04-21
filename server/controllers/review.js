const express = require('express');
const app = express.Router();
const { ObjectId } = require('mongodb');
const { addReviewToMenuItem, deleteReview, getReviewsByMenuItem } = require('../models/review.js');
const {updateReview } = require("../models/review");
const { addReviewToEventItem } = require("../models/eventItem.js");


app
.post('/:menuItemId', (req, res) => {
    addReviewToMenuItem(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));
})
.post('/post/:eventItemId', (req, res) => {
    console.log('hi');
    addReviewToEventItem(req.body, req.params.eventItemId)
    .then(x => res.status(200).send(x));
})
.delete('/:menuItemId', (req, res) => {
    deleteReview(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));

})
.get('/:menuItemId', (req, res) => {
    getReviewsByMenuItem(req.params.menuItemId)
    .then(x => res.status(200).send(x));
})
.patch('/:menuItemId', (req, res) => {
    updateReview(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));
})

module.exports = app