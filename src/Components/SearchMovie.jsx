import React, { Component } from 'react';
import {
  getMovieId,
  getMovieLocations,
  getMovieLocationsInfo,
} from '../Utils/movies';
import * as api from '../Utils/api';
// import DisplayMarkers from "./DisplayMarkers";
import NewWrappedMap from './NewMovieMap';
import { APIKey } from '../config.js';
import MovieCard from './MovieCard';
import ViewToggler from './ViewToggler';
import { Link } from '@reach/router';
import Header from './Header';

class SearchMovie extends Component {
  state = {
    movieTitle: '',
    coordinates: [],
    movieId: '',
    movieInfo: [],
  };

  handleClick = (event) => {
    //this.props.setMovieId(this.state.movieId);
    getMovieLocationsInfo(this.state.movieId).then((movieInfo) => {
      this.setState({ movieInfo }, () => {
        console.log(this.state.movieInfo);
      });
    });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value }, () => {
      //console.log(this.state.movieTitle);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    getMovieId(this.state.movieTitle).then((movieId) => {
      this.setState({ movieId });
      getMovieLocations(movieId).then((addresses) => {
        // need a promise all,
        // should resolve when you have all the api data
        // THEN you can set state

        return Promise.all(
          addresses.map((address) => api.getLatLng(address))
        ).then((coords) => {
          this.setState({ coordinates: coords }, () => {
            console.log(this.state.movieId);
          });
        });
      });
    });
  };

  render() {
    return (
      <>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <input
            id="movie-search"
            type="text"
            onChange={this.handleChange}
          ></input>
          <button id="movie-search">Search Movie</button>
          {/* <Link to="/movie_information"> */}{' '}
          {this.state.movieId && (
            <button onClick={this.handleClick}>View Movie Info</button>
          )}
          {/* </Link> */}
        </form>
        {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}

        <div style={{ width: '75%', height: '100vh' }}>
          <NewWrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
            loadingElement={<div style={{ height: '100' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            coordinates={this.state.coordinates}
          />
        </div>
        <ViewToggler>
          {this.state.movieInfo.map((info) => {
            return <MovieCard key={info.movieLocation} {...info} />;
          })}
        </ViewToggler>
      </>
    );
  }
}

export default SearchMovie;

// { lat: 55.378051, lng: -3.435973 },
//       { lat: 56.49067119999999, lng: -4.2026458 },
//       { lat: 52.3555177, lng: -1.1743197 },
