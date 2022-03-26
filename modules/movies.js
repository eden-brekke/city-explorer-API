'use strict';
const { default: axios } = require('axios');

//require cache
const cache = require('./cache.js');

async function getMovies(request, response) {
  try {
    let city = request.query.city;

    //set up the cache key
    let key = city + 'movies';
    //check the cache for existing data
    if (cache[key] && (Date.now() - cache[key].timestamp) < 1000 * 60 * 60 * 24 * 7) {
      console.log('theres a some movies in here!');
      response.status(200).send(cache[key].data);
    } else {
      let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);
      console.log(url);
      let cityMovie = await axios.get(url);
      let movieDisplay = [];
      cityMovie.data.results.forEach(title => {
        let movie = new Movie(title);
        movieDisplay.push(movie);
      });
      cache[key]={
        data: movieDisplay,
        timestamp: Date.now()
      };
      response.send(movieDisplay);
    }
  } catch (error) {
    response.status(500).send('Movie route problem');
  }
}


class Movie {
  constructor(element) {
    this.title = element.title;
    this.description = element.overview;
    this.language = element.original_language;
    this.tagline = element.tagline;
    this.imgURL = element.poster_path;
    this.releaseDate = element.releaseDate;
  }
}

module.exports = getMovies;
