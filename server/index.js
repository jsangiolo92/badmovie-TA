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

  apiHelpers.getMovies(req.query.genre, (err, data) => {
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
  let q = `insert into favorites (id, title, release_date, vote_average, poster_path) values(?, ?, ?, ?, ?)`;
  let params = [req.body.id, req.body.title, req.body.release_date, req.body.vote_average, req.body.poster_path];

  db.connection.query(q, params, (err) => {
    if (err) console.log('error on save to db: ', err);
    else res.sendStatus(201);
  })
});

app.post('/delete', function(req, res) {
  let q = `delete from favorites where id = ${req.body.id}`;
  db.connection.query(q, (err) => {
    if (err) console.log('error on delete from db: ', err);
    else res.sendStatus(201);
  })
});

app.get('/query', (req, res) => {
  let q = `select * from favorites`;
  db.connection.query(q, (err, results) => {
    if (err) console.log('error on db query: ', err);
    else res.send(results);
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
