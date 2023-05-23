const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/random', routes.randomDrink);
app.get('/search/:keyword', routes.findDrink);
app.get('/ingredients/:ingredient', routes.findIngredient);
app.get('/food/:type', routes.findFood);

app.listen(config.server_port, () => {
  console.log(`Server is running at http://${config.server_host}:${config.server_port}/`);
});