const express = require('express');
const { getAllUniversities, addUniversity, deleteUniversity, getUniversity } = require('../models/university.js');
const {updateUniversity} = require("../models/university");
const app = express.Router();
const {getErrorTuple} = require('../functions/session.js')

app
.get('/', (req, res) => { // this will GET all universities from the database
    getAllUniversities()
    .then(x => res.status(200).send(x)) // send the universities back to the client
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])}); // if there is an error, send it back to the client
})
.get('/:universityId', (req, res) => {
    getUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
                   res.status(error[0]).send(error[1])});
})
.post('/', (req, res) => {
    addUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.patch('/:universityId', (req, res) => {
    updateUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.delete('/:universityId', (req, res) => {
    deleteUniversity(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})


module.exports = app