const express = require('express');
const app = express();
const port = 3000;
const menuitemController = require('./controllers/menuItem.js');
const diningHallController = require('./controllers/diningHall.js');
const universityController = require('./controllers/university.js');
const dayController = require('./controllers/day.js');
const userController = require('./controllers/user.js');
const { ObjectId } = require('mongodb');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
console.log(new ObjectId());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/error', (req, res) => {
    res.status(404).send('Error 404')
})
.use('/api/v1/menuitem', menuitemController)
.use('/api/v1/dininghall', diningHallController)
.use('/api/v1/university', universityController)
.use('/api/v1/day', dayController)
.use('/api/v1/user', userController)






app.listen(port, () => console.log(`Example app listening on port ${port}!`));

