const express = require('express');
const { addMenuItem, getAllMenuItems, getMenuItemsByDate, getMenuItemsByDiningHall, getMenuItemsByMealTypeByDate, deleteMenuItem, getMenuItemById, updateMenuItem } = require('../models/menuItem.js');
const app = express.Router();
const {getErrorTuple} = require('../functions/session.js')

app
.post('/', (req, res) => { // this will POST a new menu item to the database from the request body
    addMenuItem(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])}); // send the new menu item back to the client
})
.get('/', (req, res) => { // this will GET all menu items from the database
    getAllMenuItems(req) // see sever/models/menuItem.js
    .then(x => res.status(200).send(x)) // send the Menu Items back to the client
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])}); // if there is an error, send it back to the client
})
.get('/:menuItemId', (req, res) => {
    getMenuItemById(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:year/:month/:day/:diningHallId', (req, res) => { // this will GET all menu items for a given date and dining hall
    getMenuItemsByDate(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])}); // send the menu items back to the client
})
.get('/get/diningHall/:diningHallId', (req, res) => { // this will GET all menu items for a given dining hall
    getMenuItemsByDiningHall(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.get('/:year/:month/:day/:mealType/:diningHallId', (req, res) => { // this will GET all menu items for a given date, dining hall, and meal type
    getMenuItemsByMealTypeByDate(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.delete('/:menuItemId', (req, res) => {
    deleteMenuItem(req)
    .then(x => res.status(200).send(x))
    .catch(err => {const error = getErrorTuple(err.message)
        res.status(error[0]).send(error[1])});
})
.patch('/:menuItemId', (req, res) => {
    updateMenuItem(req.body)
    .then(x => res.status(200).send(x));
})


module.exports = app