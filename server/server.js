const express = require('express');
const app = express();
const port = 3000;
const menuitemController = require('./controllers/menuItem.js');
const diningHallController = require('./controllers/diningHall.js');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/error', (req, res) => {
    res.status(404).send('Error 404')
})
.use('/api/v1/menuitem', menuitemController)
.use('/api/v1/dininghall', diningHallController)






app.listen(port, () => console.log(`Example app listening on port ${port}!`));

