const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
const menuitemController = require('./controllers/menuItem.js');
const diningHallController = require('./controllers/diningHall.js');
const universityController = require('./controllers/university.js');
const userController = require('./controllers/user.js');
const reviewController = require('./controllers/review.js');
const eventItemController = require('./controllers/eventItem.js');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/', express.static('./dist'));

app.use(express.json());

app.get('/error', (req, res) => {
    res.status(404).send('Error 404')
})
.use('/api/v1/menuitem', menuitemController)
.use('/api/v1/dininghall', diningHallController)
.use('/api/v1/university', universityController)
.use('/api/v1/user', userController)
.use('/api/v1/review', reviewController)
.use('/api/v1/eventitem', eventItemController)
app.get('*', (req, res) => {
    res.sendFile('index.html',  { root: './dist' });
});

app.listen(port,hostname, () => console.log(`server running at http://${hostname}:${port}/`));

