import React, { Component } from 'react';
import getMovieLocations from '../Utils/movies';
//import IMDbKey from '../movies_config';

class MovieResponse extends Component {
  componentDidMount() {
    getMovieLocations().then((location) => {
      console.log('response from api', location);
    });
  }
  render() {
    return (
      <div>
        <h1>HELLO</h1>
      </div>
    );
  }
}

export default MovieResponse;
