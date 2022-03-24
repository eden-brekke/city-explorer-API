'use strict';

console.log('My First Server');
//REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./data/weather.json');
const { default: axios } = require('axios');

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

app.get('/weather', async (request, response, next) => {
  try {
    let city = request.query.city;

    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);

    let cityWeather = await axios.get(url);

    // console.log(cityWeather);

    let weatherDisplay = [];

    cityWeather.data.data.forEach(date => {

      let forecast = new Forecast(date);
      // console.log(forecast);
      weatherDisplay.push(forecast);
    });

    response.send(weatherDisplay);

  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    let city = request.query.city;

    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);
    console.log(url);
    let cityMovie = await axios.get(url);

    // console.log(cityMovie);

    let movieDisplay = [];

    cityMovie.data.results.forEach(title => {

      let movie = new Movie(title);
      // console.log(movie);
      movieDisplay.push(movie);
    });

    response.send(movieDisplay);

  } catch (error) {
    next(error);
  }
});


app.get('*', (request, response) => {
  response.status(404).send('this is not the page you are looking for');
});

//ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//CLASS
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

class Movie {
  constructor(element) {
    this.title = element.title;
    this.description = element.overview;
    this.language = element.original_language;
    this.tagline = element.tagline;
  }
}

//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

