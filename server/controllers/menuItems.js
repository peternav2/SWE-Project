const express = require('express');
const { add } = require('../models/menuItems.js');
const app = express.Router();

app
.post('/', (req, res) => {
    const menuItem = add(req.body).then(x => res.status(200).send(x));
});

module.exports = app;