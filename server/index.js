var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');
var db = require('../db/sql/index');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes
app.get('/search', function(req, res) {

  apiHelpers.getMovies(req.params.genre, (err, data) => {
    if (err) console.log ('error on get search: ', err);
    else res.send(data);
  })
});

app.get('/genres', function(req, res) {
  apiHelpers.getGenres((err, data) => {
    if (err) console.log('error on get to genres: ', err);
    else res.send(data);
  })
});

app.post('/save', function(req, res) {
  let q = `insert into favorites (movie_id, movie_name, vote_count, vote_average) values(?, ?, ?, ?)`;
  let params = [req.body.id, req.body.movieName, req.body.voteCount, req.body.voteAverage];

  db.connection.query(q, params, (err) => {
    if (err) console.log('error on save to db: ', err);
    else res.sendStatus(201);
  })
});

app.post('/delete', function(req, res) {
  let q = `delete from favorites where movie_id = ${req.body.id}`;
  db.connection.query(q, (err) => {
    if (err) console.log('error on delete from db: ', err);
    else res.sendStatus(201);
  })
});

//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
const movieRoutes = require('./routes/movieRoutes.js');
//Use routes
app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
