import React, { Component } from "react";
import "./App.css";
//import MovieMap from './Components/MovieMap';
import WrappedMap from "./Components/MovieMap";
import APIKey from "./config";
import Header from "./Header";
import LocationMarkers from "./Components/LocationMarkers";
import MovieResponse from "./Components/MovieResponse";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  render() {
    return (
      <>
        {/* <Dashboard /> */}

        <Dashboard />
        <MovieResponse />
        {/*<MovieMap /> */}
        {/* <LocationMarkers /> */}
      </>
    );
  }
}

export default App;
