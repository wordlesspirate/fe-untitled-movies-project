import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import APIKey from "../config";

class MovieMap extends Component {
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 53.960192, lng: -1.092438 }}
        />
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
