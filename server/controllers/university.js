const express = require('express');
const { getAllUniversities, addUniversity, deleteUniversity, getUniversity } = require('../models/university.js');
const app = express.Router();
app
.get('/', (req, res) => { // this will GET all universities from the database
    getAllUniversities()
    .then(x => res.status(200).send(x)) // send the universities back to the client
    .catch(err => res.status(404).send(err)); // if there is an error, send it back to the client
})
.get('/:universityId', (req, res) => {
    getUniversity(req.params.universityId)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.post('/', (req, res) => {
    addUniversity(req.body)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})
.delete('/:universityId', (req, res) => {
    deleteUniversity(req.params.universityId)
    .then(x => res.status(200).send(x))
    .catch(err => res.status(404).send(err));
})


module.exports = app