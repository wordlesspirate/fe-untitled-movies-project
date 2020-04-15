import React, { Component } from "react";
// import * as MovieLocations from "../data/locations.json";
// import { Marker } from 'react-google-maps';
import * as api from "../Utils/api";

class LocationMarkers extends Component {
  state = {
    address: "",
    location: null,
  };

  getLocation = () => {
    api.getLatLng(this.state.address).then((location) => {
      console.log(location);
      this.setState({ location }, () => {
        console.log("find the error", this.state.location);
      });
    });
  };

  componentDidMount() {
    // this.setState(({this.props.address}))
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.location !== prevState.location) {
  //     this.setState(this.state.location);
  //   }
  // }

  render() {
    return (
      <div>
        <h1>
          {/* {MovieLocations.locations.map((location) => {
            console.log(location);
          })} */}
          {/* {this.state.location && (
            <Marker
              position={{
                lat: this.state.location.lat,
                lng: this.state.location.lng,
              }}
            />
          )} */}
        </h1>
      </div>
    );
  }
}
export default LocationMarkers;
