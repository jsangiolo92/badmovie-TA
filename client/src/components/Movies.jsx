import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)

  }

  getImage(movie) {
    if(movie.poster_path) return `http://image.tmdb.org/t/p/w154/${movie.poster_path}`;
    else return 'https://cdn.browshot.com/static/images/not-found.png';
  }

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map(movie =>
          <li key={movie.id} className="movie_item" onClick={() => this.props.clickMovie(movie)}>
          <img src={this.getImage(movie)} />
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>{movie.release_date.slice(0,4)}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>
        )}
      </ul>
    );
  }
}

export default Movies;