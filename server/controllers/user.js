const express = require('express');
const { addUser, getUserByUsernamePassword, getUserById, deleteUser, getUserByUsername} = require('../models/user.js');

const app = express.Router();

app
.post('/', (req, res) => {
    addUser(req.body)
    .then(x => {
        if(x == null){
            res.status(400).send(x)
        }
        else{
            res.status(200).send(x)
        }
        });
})
.get('/:username/:password', (req, res) => {
    getUserByUsernamePassword(req.params.username, req.params.password)
    .then(x => {
        if(x == null){
            res.status(400).send(x)
        }
        else{
            res.status(200).send(x)
        }
    });
})
.get('/:username', (req, res) => {
    getUserByUsername(req.params.username)
    .then(x => res.status(200).send(x));
})
.get('/:userId', (req, res) => {
    getUserById(req.params.userId)
    .then(x => res.status(200).send(x));
})
.delete('/:username/:password', (req, res) => {
    deleteUser(req.params.username, req.params.password)
    .then(x => res.status(200).send(x));
})
module.exports = app