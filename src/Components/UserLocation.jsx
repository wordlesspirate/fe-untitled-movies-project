import React, { Component } from "react";
import { Marker } from "react-google-maps";

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: 0, lng: 0 };
    this.getCoords = this.getCoords.bind(this);
    // this.watchPos = this.watchPos.bind(this);
  }

  getCoords(position) {
    console.log(position.coords.latitude);
    this.setState(
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      () => {
        console.log(this.state);
      }
    );
  }

  componentDidMount() {
    // Check if geolocation is avaliable - allow or block location
    // if ("geolocation" in navigator) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoords);
    }

    // navigator.geolocation.watchPosition(this.watchPos);
  }

  render() {
    return <div>{<Marker position={this.state} />}</div>;
  }
}

export default UserLocation;
