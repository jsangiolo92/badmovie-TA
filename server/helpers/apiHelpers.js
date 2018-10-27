const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

const getGenres = (callback) => {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  axios.get(url)
  .then(({data}) => {
    callback(null, data.genres);
  })
  .catch( (err) => {
    console.log('error on axios get to genres: ', err);
  })
}

const getMovies = (id, year, callback) => {
  let url;
  if (year === 'All') url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}`;
  else url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&with_genres=${id}`;
  
  
  axios.get(url)
  .then( ({data}) => {
    callback(null, data.results);
  })
  .catch( (err) => {
    console.log('error on axios get to movies: ', err);
  })
}

module.exports.getGenres = getGenres;
module.exports.getMovies = getMovies;