'use strict';

console.log('My First Server');
//REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/Weather');
const getMovies = require('./modules/Movies');

//define port and prove that our .env file works
const PORT = process.env.PORT || 3002;

//Instantiate express server by calling express
const app = express();

//USE
app.use(cors());

//ROUTES
app.get('/', (request, response) => {
  response.send('Welcome to City Explorer Server');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('this is not the page you are looking for');
});

//ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

