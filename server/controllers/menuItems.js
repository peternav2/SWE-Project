const express = require('express');
const { add } = require('../models/menuItems.js');
const app = express.Router();

app
.post('/', (req, res) => {
    console.log(req.body);
    const menuItem = add({ item: "nothings", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }).then(x => res.sendStatus(200).send(x));
})
module.exports = app