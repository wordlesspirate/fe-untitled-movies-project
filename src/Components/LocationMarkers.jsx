import React, { Component } from "react";
import * as MovieLocations from "../data/locations.json";
import { Marker } from "react-google-maps";

class LocationMarkers extends Component {
  render() {
    return (
      <div>
        <h1>
          {MovieLocations.locations.map((location) => {
            console.log(location);
          })}
        </h1>
      </div>
    );
  }
}
export default LocationMarkers;
