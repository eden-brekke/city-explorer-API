const { default: axios } = require('axios');

async function getWeather (request, response, next) {
  try {
    let city = request.query.city;
    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);
    let cityWeather = await axios.get(url);
    let weatherDisplay = [];
    cityWeather.data.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
    });
    response.send(weatherDisplay);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

module.exports = getWeather;
