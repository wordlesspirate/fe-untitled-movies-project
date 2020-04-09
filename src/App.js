import React, { Component } from "react";
import "./App.css";

//import MovieMap from './Components/MovieMap';
import WrappedMap from "./Components/MovieMap";
import APIKey from "./config";
import Header from "./Header";
import LocationMarkers from "./Components/LocationMarkers";
import MovieResponse from "./Components/MovieResponse";
import Dashboard from "./Components/Dashboard";

import MovieMap from "./Components/MovieMap";
import Register from "./Components/Register";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import { Router } from "@reach/router";
import { Auth } from "aws-amplify";
import Home from "./Components/Home";


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
      </>

      <div>
        <Router>
          <MovieMap path="/map" />
        </Router>
        <Register />
        <Welcome />
        <Login />
        <Home />
      </div>

    );
  }
}

export default App;
