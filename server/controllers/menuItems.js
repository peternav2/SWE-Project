const express = require('express');
const { add } = require('../models/menuItems.js');
const app = express.Router();

app
.post('/', (req, res) => { // this will POST a new menu item to the database from the request body
    console.log("request body");
    console.log(req.body);
    add(req.body)
    .then(x => res.status(200).send(x)); // send the new menu item back to the client
    console.log("after add in controller");
})
module.exports = app