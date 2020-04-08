import React, { Component } from "react";
import "./App.css";
//import MovieMap from './Components/MovieMap';
import WrappedMap from "./Components/MovieMap";
import APIKey from "./config";
import Header from "./Header";
import LocationMarkers from "./Components/LocationMarkers";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div style={{ width: "75%", height: "100vh" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
            loadingElement={<div style={{ height: "100" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />

          {/*<MovieMap /> */}
        </div>
        <LocationMarkers />
      </>
    );
  }
}

export default App;
