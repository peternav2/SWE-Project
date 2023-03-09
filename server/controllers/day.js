const express = require('express');

const { addDayToDiningHall } = require('../models/day.js');

const app = express.Router();

app
.post('/:universityName/:diningHallName', (req, res) => {
    addDayToDiningHall(req.params.universityName, req.params.diningHallName, req.body)
    .then(x => res.status(200).send(x))
})



module.exports = app