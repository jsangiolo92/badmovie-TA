import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then( ({data}) => {
      this.setState({genres: data.genres});
    })
  }

  getGenre() {
    return document.getElementById('list').value
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select id="list">
          {this.state.genres.map( genre =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>  
          )}
        </select>
        <br/><br/>

        <button onClick={() => {
          let genre = this.getGenre();
          this.props.getMovies(genre)
        }}>Search</button>

      </div>
    );
  }
}

export default Search;