import express from 'express';
const app = express();
const port = 3000;


const menuitemsController = require('./controllers/menuitems');


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/error', (req, res) => {
    res.status(404).send('Error 404')
})
.use('/api/v1/menuitems')






app.listen(port, () => console.log(`Example app listening on port ${port}!`));

