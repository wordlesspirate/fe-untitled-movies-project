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
import Button from '@material-ui/core/Button';
// import NavigationIcon from "@material-ui/icons/Navigation";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MovieCard from './MovieCard';
import ViewToggler from './ViewToggler';

class SearchMovie extends Component {
  state = {
    movieTitle: '',
    coordinates: [],
    movieId: '',
    movieInfo: [],
    error: null,
    isLoading: false,
    fieldError: false,
  };

  handleClick = (event) => {
    getMovieLocationsInfo(this.state.movieId)
      .then((movieInfo) => {
        this.setState({ movieInfo });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movieTitle: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.movieTitle.length) {
      this.setState({ fieldError: true });
    } else {
      this.setState({ isLoading: true, fieldError: false, error: false });

      getMovieId(this.state.movieTitle)
        .then((movieId) => {
          this.setState({ movieId });
          getMovieLocations(movieId)
            .then((addresses) => {
              return Promise.all(
                addresses.map((address) => api.getLatLng(address))
              )
                .then((coords) => {
                  this.setState({ coordinates: coords, isLoading: false });
                })
                .catch((error) => {
                  this.setState({ error }, () => {
                    console.log(this.state.error);
                  });
                });
            })
            .catch((error) => {
              this.setState({ error }, () => {
                console.log(this.state.error);
              });
            });
        })
        .catch((error) => {
          this.setState({ error }, () => {
            console.log(this.state.error);
          });
        });
    }
  };

  render() {
    // if (this.state.error)
    //   return <p>Oops something's gone wrong. Please try again.</p>;

    return (
      <>
        <Typography variant="body2" color="text" align="center">
          <form onSubmit={this.handleSubmit} required={true}>
            <TextField
              id="movie-search"
              label="Search for a movie"
              variant="outlined"
              onChange={this.handleChange}
              required={true}
              error={this.state.fieldError}
            />
            <Button
              variant="contained"
              id="movie-search"
              onClick={this.handleSubmit}
            >
              {/* <NavigationIcon /> */}
              Find
            </Button>
            {this.state.movieId && !this.state.error && (
              <button onClick={this.handleClick}>View Movie Info</button>
            )}
          </form>
        </Typography>
        {this.state.isLoading && !this.state.error && (
          <p>Please wait while your film locations load</p>
        )}
        {this.state.error && (
          <p>There has been an error finding your film, please try again</p>
        )}
        <>
          <br />
        </>
        {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
        <div
          style={{
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <div
            style={{
              justifyContent: "center",
              width: "75%",
              height: "100vh",
            }}
          > */}
          <NewWrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            coordinates={this.state.coordinates}
            movieInfo={this.state.movieInfo}
          />

          {/* </Link> */}
          {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
        </div>
        {/* <ViewToggler>
          {this.state.movieInfo.map((info) => {
            return <MovieCard key={info.movieLocation} {...info} />;
          })}
        </ViewToggler> */}
      </>
    );
  }
}

export default SearchMovie;

// { lat: 55.378051, lng: -3.435973 },
//       { lat: 56.49067119999999, lng: -4.2026458 },
//       { lat: 52.3555177, lng: -1.1743197 },
