import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import APIKey from "../config";

class MovieMap extends Component {
  state = {
    movieLocations: [
      { lat: 53.955755, lng: -1.078316 },
      { lat: 53.959446, lng: -1.080061 },
    ],
  };

  displayMarkers = () => {
    return this.state.movieLocations.map((movieLocation, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: movieLocation.lat,
            lng: movieLocation.lng,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 53.960192, lng: -1.092438 }}
        >
          <Marker
            position={{ lat: 53.960192, lng: -1.092438 }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

const mapStyles = {
  width: "100%",
  height: "100%",
};

export default GoogleApiWrapper({
  apiKey: APIKey,
})(MovieMap);
