import React, { Component } from "react";
import {
  getMovieId,
  getMovieLocations,
  getMovieLocationsInfo,
} from "../Utils/movies";
import * as api from "../Utils/api";
// import DisplayMarkers from "./DisplayMarkers";
import NewWrappedMap from "./NewMovieMap";
import { APIKey } from "../config.js";
// import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core/";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";
import ViewToggler from "./ViewToggler";

// fix button

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = (theme) => ({
  background: {
    backgroundColor: theme.background.option1.lightBlue,
  },

  root: {
    "& > *": {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(2),
  },
  searchBox: {
    margin: theme.spacing(1),
    width: "20ch",
  },
});

class SearchMovie extends Component {
  state = {
    movieTitle: "",
    coordinates: [],
    movieId: "",
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
          this.setState(
            { coordinates: coords }
            // , () => {
            // console.log(this.state.movieId);
            // }
          );
        });
      });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Container component="main" maxWidth="xs">
          <div className={classes.root}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                className={classes.searchBox}
                id="movie-search"
                label="Search for a movie"
                variant="outlined"
                onChange={this.handleChange}
              />
              <Fab variant="extended" id="movie-search">
                <NavigationIcon className={classes.extendedIcon} />
                Submit
              </Fab>
              {/* <Button variant="contained" id="movie-search">
            <NavigationIcon />
            Find
          </Button> */}
              {this.state.movieId && (
                <button onClick={this.handleClick}>View Movie Info</button>
              )}
            </form>
          </div>
        </Container>
        <>
          <br />
        </>
        {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
        <div
          style={{
            width: "100%",
            height: "80vh",
            justifyContent: "center",
            alignItems: "center",
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
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            coordinates={this.state.coordinates}
          />

          {/* </Link> */}
          {/* <DisplayMarkers coordinates={this.state.coordinates} /> */}
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

export default withStyles(useStyles)(SearchMovie);

// { lat: 55.378051, lng: -3.435973 },
//       { lat: 56.49067119999999, lng: -4.2026458 },
//       { lat: 52.3555177, lng: -1.1743197 },
