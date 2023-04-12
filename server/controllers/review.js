const express = require('express');
const app = express.Router();
const { ObjectId } = require('mongodb');
const { addReviewToMenuItem, deleteReview, getReviewsByMenuItem } = require('../models/review.js');
const {getErrorTuple} = require('../functions/session.js')
const {updateReview} = require("../models/review");

app
.post('/:menuItemId', (req, res) => {
    addReviewToMenuItem(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.delete('/:menuItemId', (req, res) => {
    deleteReview(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});

})
.get('/:menuItemId', (req, res) => {
    getReviewsByMenuItem(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.patch('/:menuItemId', (req, res) => {
    updateReview(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));
})

module.exports = app