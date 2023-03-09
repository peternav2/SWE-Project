const express = require('express');
const { addUser } = require('../models/user.js');

const app = express.Router();

app
.post('/', (req, res) => {
    addUser(req.body)
    .then(x => res.status(200).send(x));
})

module.exports = app