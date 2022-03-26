'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const getMovies = require('./modules/movies');
const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const city = request.query.city;
  weather(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}


app.listen(PORT, () => console.log(`Server up on ${PORT}`));
