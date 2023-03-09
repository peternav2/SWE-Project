const express = require('express');
const app = express.Router();
const { ObjectId } = require('mongodb');
const { addReviewToMenuItem, deleteReview } = require('../models/review.js');

app
.post('/:menuItemId', (req, res) => {
    addReviewToMenuItem(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));
})
.delete('/:menuItemId', (req, res) => {
    deleteReview(req.body, req.params.menuItemId)
    .then(x => res.status(200).send(x));

})

module.exports = app