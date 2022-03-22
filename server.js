'use strict';

console.log('My First Server');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());


app.get('/', (request, response) => {
  response.send('Welcome to City Explorer Server');
});

app.get('/weather', (request, response) => {
  try {
    let city = request.query.city;
    console.log(city);
    let cityWeather = weatherData.find(location => location.city_name === city);
    console.log(cityWeather);
    let weatherDisplay = [];
    cityWeather.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
      console.log(weatherDisplay);
    });

    response.send(weatherDisplay);

  } catch (error) {
    next(error);
  }
});



app.get('*', (request, response) => {
  response.status(404).send('this is not the page you are looking for');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));

