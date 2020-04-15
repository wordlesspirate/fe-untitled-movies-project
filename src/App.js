import React, { Component } from "react";
// import "./App.css";

//import MovieMap from './Components/MovieMap';
// import WrappedMap from "./Components/MovieMap";
// import APIKey from "./config";
// import Header from "./Components/Header";
// import LocationMarkers from "./Components/LocationMarkers";
import MovieResponse from "./Components/MovieResponse";
import Dashboard from "./Components/Dashboard";

// import UserLocation from "./Components/UserLocation";

// import MovieMap from "./Components/MovieMap";
// import Register from "./Components/Register";
// import Welcome from "./Components/Welcome";
// import Login from "./Components/Login";
// import { Router } from "@reach/router";
// import { Auth } from "aws-amplify";
// import Home from "./Components/Home";

import Home from "./Components/Home";
import MovieMap from "./Components/MovieMap";
import Register from "./Components/Register";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Genres from "./Components/Genres";
import { Router } from "@reach/router";
import { Auth } from "aws-amplify";
import Profile from "./Components/Profile";


class App extends Component {
  state = {};

  render() {
    return (

      <>
        {/* <Dashboard /> */}

        <Dashboard />
        <MovieResponse />
        {/*<MovieMap /> */}
        {/* <LocationMarkers /> */}

        {/* <div>
          <Router>
            <MovieMap path="/map" />
          </Router>
          <Register />
          <Welcome />
          <Login />
          <Home />
        </div> */}
      </>

      <div className={"AppMain"}>
        <Home />
        <Router>
          <Profile path="/profile/*" />
          <Genres path="/profile/genres" />
          {/* <Genres path="/genres" /> */}

          {/* <MovieMap path="/map" /> */}
          {/* <LocationMarkers /> */}
          {/* <Dashboard /> */}
          {/* {<MovieResponse /> */}
        </Router>

        <Register />
        <Welcome />
        <Login />

    );
  }
}

export default App;
