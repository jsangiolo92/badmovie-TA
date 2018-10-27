const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/badmovies', { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

let movieSchema = mongoose.Schema({
  id : {type: Number, unique: true},
  title: String,
  release_date: String,
  vote_average: Number,
  poster_path: String
});

let Movie = mongoose.model('Movie', movieSchema);

let save = (movie) => {
  return Movie.findOneAndUpdate(
    {id: movie.id},
    {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path
    },
    {upsert: true}
  )
}

let remove = (movie) => {
  return Movie.findOneAndRemove(
    {id: movie.id}
  ).exec()

}

let getFavorites = () => {
  return Movie.find().exec()
}

module.exports.db = db
module.exports.save = save
module.exports.remove = remove
module.exports.getFavorites = getFavorites