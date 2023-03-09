const express = require('express');
const { addMenuItem } = require('../models/menuItem.js');
const app = express.Router();

app
.post('/', (req, res) => { // this will POST a new menu item to the database from the request body
    addMenuItem(req.body)
    .then(x => res.status(200).send(x)); // send the new menu item back to the client
})

module.exports = app