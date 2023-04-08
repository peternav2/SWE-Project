const express = require('express');
const { addMenuItem, getAllMenuItems, getMenuItemsByDate, getMenuItemsByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById } = require('../models/menuItem.js');
const app = express.Router();

app
.post('/', (req, res) => { // this will POST a new menu item to the database from the request body
    addMenuItem(req.body)
    .then(x => res.status(200).send(x)); // send the new menu item back to the client
})
.get('/', (req, res) => { // this will GET all menu items from the database
    getAllMenuItems() // see sever/models/menuItem.js
    .then(x => res.status(200).send(x)) // send the Menu Items back to the client
    .catch(err => res.status(404).send(err)); // if there is an error, send it back to the client
})
.get('/:menuItemId', (req, res) => {
    getMenuItemById(req.params.menuItemId)
    .then(x => res.status(200).send(x));
})
.get('/:year/:month/:day/:diningHallId', (req, res) => { // this will GET all menu items for a given date and dining hall
    getMenuItemsByDate(+req.params.year, +req.params.month, +req.params.day, req.params.diningHallId)
    .then(x => res.status(200).send(x)); // send the menu items back to the client
})
.get('/get/diningHall/:diningHallId', (req, res) => { // this will GET all menu items for a given dining hall
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