const express = require('express');
const { add } = require('../models/menuItems.js');
const app = express.Router();

app
.post('/', (req, res) => {
    console.log("request body");
    console.log(req.body);
    add(req.body)
    .then(x => res.status(200).send(x));
    console.log("after add in controller");
})

module.exports = app