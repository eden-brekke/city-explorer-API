const { default: axios } = require('axios');

async function getMovies (request, response, next) {
  try {
    let city = request.query.city;
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);
    console.log(url);
    let cityMovie = await axios.get(url);
    let movieDisplay = [];
    cityMovie.data.results.forEach(title => {
      let movie = new Movie(title);
      movieDisplay.push(movie);
    });
    response.send(movieDisplay);
  } catch (error) {
    next(error);
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
