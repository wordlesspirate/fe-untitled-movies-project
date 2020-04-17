import React, { Component } from "react";
import { getMovieId, getMovieLocations } from "../Utils/movies";
import * as api from "../Utils/api";
// import DisplayMarkers from "./DisplayMarkers";
import NewWrappedMap from "./NewMovieMap";
import { APIKey } from "../config.js";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import TextField from "@material-ui/core/TextField";

class SearchMovie extends Component {
  state = {
    movieTitle: "",
    coordinates: [],
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
      getMovieLocations(movieId).then((addresses) => {
        // need a promise all,
        // should resolve when you have all the api data
        // THEN you can set state

        return Promise.all(
          addresses.map((address) => api.getLatLng(address))
        ).then((coords) => {
          this.setState({ coordinates: coords });
        });

        // const coords = [];
        // addresses.forEach((address) => {
        //   api.getLatLng(address).then((latLng) => {
        //     coords.push(latLng);
        //   });
        // });
        //figure out how to deal with errors/empty coordinates
      });
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="movie-search"
            label="Search for a movie"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Button variant="contained" id="movie-search">
            <NavigationIcon />
            Find
          </Button>
        </form>
        {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
        {/* <div style={{ width: "75%", height: "100vh" }}> */}
        <div
          style={{
            justifyContent: "center",
            width: "75%",
            height: "100vh",
          }}
        >
          <NewWrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            coordinates={this.state.coordinates}
          />
        </div>
      </>
    );
  }
}

export default SearchMovie;

// { lat: 55.378051, lng: -3.435973 },
//       { lat: 56.49067119999999, lng: -4.2026458 },
//       { lat: 52.3555177, lng: -1.1743197 },
