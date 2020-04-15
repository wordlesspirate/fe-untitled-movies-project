import React, { Component } from 'react';
import {
  // GoogleMap,
  // Marker,
  // DirectionsService,
  DirectionsRenderer,
  // LatLng,
} from 'react-google-maps';
// import APIKey from "../config";

class RouteCalculator extends Component {
  state = {
    userLocation: null,
    directions: null,
  };

  componentDidMount() {
    this.setState({ userLocation: this.props.userLocation });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLocation !== this.state.userLocation) {
      this.setState({ userLocation: this.props.userLocation });
    }
    if (this.props.destination !== prevProps.destination) {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.state.userLocation.lat,
            this.state.userLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            this.props.destination.lat,
            this.props.destination.lng
          ),
          travelMode: 'DRIVING',
        },
        (result, status) => {
          // console.log("this is steps", result.routes[0].legs[0].steps);

          if (status === 'OK') {
            this.setState(
              {
                directions: result,
                polyline: result.routes[0].overview_polyline,
              }
              // () => {
              //   console.log(result);
              // }
            );
          } else {
            console.dir('console.dir', result);
          }
        }
      );
    }
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.directions && (
          <DirectionsRenderer defaultDirections={this.state.directions} />
        )}{' '}
      </div>
    );
  }
}

export default RouteCalculator;
