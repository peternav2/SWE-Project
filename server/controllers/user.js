const express = require('express');
const { addUser, getUser } = require('../models/user.js');

const app = express.Router();

app
.post('/', (req, res) => {
    addUser(req.body)
    .then(x => res.status(200).send(x));
})
.get('/:username/:password', (req, res) => {
    getUser(req.params.username, req.params.password)
    .then(x => res.status(200).send(x));
})

module.exports = app