const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

const getGenres = (callback) => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  axios.get(url)
  .then(({data}) => {
    callback(null, data);
  })
}

const getMovies = (genre, callback) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2018&with_genres=${genre}`;
  
  axios.get(url)
  .then(({data}) => {
    callback(null, data);
  })
}

module.exports.getGenres = getGenres;
module.exports.getMovies = getMovies;