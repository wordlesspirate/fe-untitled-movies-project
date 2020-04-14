import React, { Component } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  LatLng,
} from 'react-google-maps';
import APIKey from '../config';

class RouteCalculator extends Component {
  state = {
    userLocation: null,
    directions: null,
  };

  componentDidMount() {
    this.setState({ userLocation: this.props.userLocation });
  }

  componentDidUpdate(prevProps) {
    console.log('wheres my location at', this.props.movieLocations[0]);
    if (this.props.movieLocations !== prevProps.movieLocations) {
      console.log('!!!!!!!!!!!!!', this.props.movieLocations);
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.state.userLocation.lat,
            this.state.userLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            this.props.movieLocations[0].lat,
            this.props.movieLocations[0].lng
          ),
          travelMode: 'DRIVING',
        },
        (result, status) => {
          console.log(result);
          //console.log(result.routes[0].overview_polyline);
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
            console.dir(result);
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
