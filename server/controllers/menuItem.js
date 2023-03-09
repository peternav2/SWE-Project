const express = require('express');
const { addMenuItem, getMenuItemsByDate, getMenuItemsByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem } = require('../models/menuItem.js');
const app = express.Router();

app
.post('/', (req, res) => { // this will POST a new menu item to the database from the request body
    addMenuItem(req.body)
    .then(x => res.status(200).send(x)); // send the new menu item back to the client
})
.get('/:year/:month/:day/:diningHallId', (req, res) => { // this will GET all menu items for a given date and dining hall
    getMenuItemsByDate(+req.params.year, +req.params.month, +req.params.day, req.params.diningHallId)
    .then(x => res.status(200).send(x)); // send the menu items back to the client
})
.get('/:diningHallId', (req, res) => { // this will GET all menu items for a given dining hall
    getMenuItemsByDiningHall(req.params.diningHallId)
    .then(x => res.status(200).send(x));
})
.get('/:year/:month/:day/:mealType/:diningHallId', (req, res) => { // this will GET all menu items for a given date, dining hall, and meal type
    getMenuItemsByMealTypeByDate(+req.params.year, +req.params.month, +req.params.day, req.params.mealType, req.params.diningHallId)
    .then(x => res.status(200).send(x));
})
.delete('/:menuItemId', (req, res) => {
    deleteMenuItem(req.params.menuItemId)
    .then(x => res.status(200).send(x));
})


module.exports = app