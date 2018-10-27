var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var db = require('../db/mongodb/index');

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes
app.get('/search', function(req, res) {
  apiHelpers.getMovies(req.query.genre, req.query.year, (err, data) => {
    if (err) console.log('error on get to search: ', err);
    else res.send(data);
  })
});

app.get('/genres', function(req, res) {
  apiHelpers.getGenres( (err, data) => {
    if (err) console.log('error on get genres: ', err);
    else res.send(data);
  })
});

app.post('/save', function(req, res) {
  db.save(req.body)
  .then( () => {res.sendStatus(201)})
  .catch( () => {res.sendStatus(500)})
});

app.post('/delete', function(req, res) {
  db.remove(req.body)
  .then( () => res.sendStatus(201))
  .catch( () => res.sendStatus(500))
});

app.get('/favorites', (req, res) => {
  db.getFavorites()
  .then( (results) => {res.send(results)})
  .catch( (err) => console.log('erronr on call to getFavorites: ', err))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
