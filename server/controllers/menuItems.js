const express = require('express');
const menuItems = require('./models/menuItems');
const { add } = require('./models/menuItems');
const app = express.Router();

app
.post('/', (req, res) => {
    const menuItem = add(req.body).then(x => res.status(200).send(x));
});
