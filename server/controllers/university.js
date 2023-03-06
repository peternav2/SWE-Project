const express = require('express');
const { getAll, add } = require('../models/university.js');
const app = express.Router();
app
.get('/', (req, res) => { // this will GET all universities from the database
    getAll()
    .then(x => res.status(200).send(x)); // send the universities back to the client
})
app
.post('/', (req, res) => {
    add(req.body)
    .then(x => res.status(200).send(x));
})


module.exports = app