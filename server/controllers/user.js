const express = require('express');
const { addUser, getUserByUsernamePassword, getUserById, deleteUser } = require('../models/user.js');

const app = express.Router();

app
.post('/', (req, res) => {
    addUser(req.body)
    .then(x => res.status(200).send(x));
})
.get('/:username/:password', (req, res) => {
    getUserByUsernamePassword(req.params.username, req.params.password)
    .then(x => res.status(200).send(x));
})
.get('/:userId', (req, res) => {
    getUserById(req.params.userId)
    .then(x => res.status(200).send(x));
})
.delete('/:username/:password', (req, res) => {
    deleteUser(req.params.username, req.params.password)
    .then(x => res.status(200).send(x));
})
module.exports = app