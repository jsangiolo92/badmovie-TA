import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies(genre, year) {
    Axios.get('/search', {params: {genre: genre, year: year}})
    .then( ({data}) => {
      this.setState({
        movies: data
      });
    })
    .catch( (err) => {
      console.log('erron on axios get to search: ', err);
    })
  }

  saveMovie(movie) {
    Axios.post('/save', movie)
    .then (()=>{
      console.log('Movie saved to favorites! ')
      this.getFavorites()
    })
    .catch( (err) =>{
      console.log('error on axios post to save: ', err);
    })
  }

  deleteMovie(movie) {
    Axios.post('/delete', movie)
    .then ( () => {
      console.log('Movie deleted from favorites!');
      this.getFavorites()
    })
    .catch( (err) => {
      console.log('error on axios post to delete: ', err);
    })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  getFavorites() {
    Axios.get('/favorites')
    .then ( ({data}) => {
      this.setState({favorites: data})
    })
    .catch( (err) => {console.log('error on axios get to favorites: ', err)})
  }

  componentDidMount() {
    this.getFavorites()
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} searchMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
          clickMovie={this.state.showFaves ? this.deleteMovie : this.saveMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));