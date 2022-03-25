'use strict';
const axios = require('axios');

let cache = require('./cache.js');


async function getWeather(city) {
  const key = 'weather-' + city;
  const url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit for the weather!');
  } else {
    console.log('Cache missed the weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
  }
}

module.exports = getWeather;
