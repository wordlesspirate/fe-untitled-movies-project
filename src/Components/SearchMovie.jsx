import React, { Component } from 'react';
import { getMovieId, getMovieLocations } from '../Utils/movies';
import * as api from '../Utils/api';

class SearchMovie extends Component {
  state = { movieTitle: '', coordinates: [] };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value }, () => {
      //console.log(this.state.movieTitle);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    getMovieId(this.state.movieTitle).then((movieId) => {
      getMovieLocations(movieId).then((addresses) => {
        const coords = [];
        addresses.forEach((address) => {
          api.getLatLng(address).then((latLng) => {
            coords.push(latLng);
          });
        });
        //figure out how to deal with errors/empty coordinates
        this.setState({ coordinates: coords }, () => {
          console.log('>>>>', this.state.coordinates);
        });
      });
    });
  };

  render() {
    //if (this.state.coordinates) return <Newcomponentpassedwithprops />;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="movie-search"
          type="text"
          onChange={this.handleChange}
        ></input>
        <button id="movie-search">Search Movie</button>
      </form>
    );
  }
}

export default SearchMovie;
