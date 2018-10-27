import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };

    this.selectedGenre = this.selectedGenre.bind(this);
  }
  getGenres() {
    Axios.get('/genres')
    .then( ({data}) => {
      this.setState({genres: data});
    })
  }

  selectedGenre() {
    return document.getElementById('dropdown').value
  }

  selectedYear() {
    return document.getElementById('year-drop-down').value
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select id="dropdown">
          {this.state.genres.map(genre => 
            <option key={genre.id} value={genre.id}>{genre.name}</option>  
          )}
        </select>
        <br/><br/>
        <select id="year-drop-down">
            <option value="All">All</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
        </select>
        <br></br>
        <br></br>
        <button onClick={() => {this.props.searchMovies(this.selectedGenre(), this.selectedYear())}}>Search</button>

      </div>
    );
  }
}

export default Search;