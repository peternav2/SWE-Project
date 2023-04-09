const express = require('express');
const { addUser, addUserTokenized, getUserByUsernamePassword, getUserByUsernamePasswordTokenized, getUserById, deleteUser, getUserByUsername} = require('../models/user.js');
const app = express.Router();
const {getErrorTuple} = require('../functions/session.js')

app
.post('/', (req, res) => {
    addUser(req)
    .then(x => {res.status(200).send(x)})
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.post('/validated', (req, res) => {
    addUserTokenized(req)
    .then(x => {res.status(200).send(x)})
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:username/:password', (req, res) => {
    getUserByUsernamePassword(req)
    .then(x => {res.status(200).send(x)})
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:username/:password/tokenized', (req, res) => {
    getUserByUsernamePasswordTokenized(req)
    .then(x => {res.status(200).send(x)})
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:username', (req, res) => {
    getUserByUsername(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:userId', (req, res) => {
    getUserById(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.delete('/:username/:password', (req, res) => {
    deleteUser(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
module.exports = app