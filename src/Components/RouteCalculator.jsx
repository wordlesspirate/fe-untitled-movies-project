import React, { Component } from 'react';
import {
  // GoogleMap,
  // Marker,
  // DirectionsService,
  DirectionsRenderer,
  // LatLng,
} from 'react-google-maps';
// import APIKey from "../config";
import ViewTogglerDirections from './ViewTogglerDirections';

class RouteCalculator extends Component {
  state = {
    userLocation: null,
    directions: null,
    textDirections: true,
  };

  // panelUpdate = () => {}
  componentDidMount() {
    this.setState({ userLocation: this.props.userLocation });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userLocation !== this.state.userLocation) {
      this.setState({ userLocation: this.props.userLocation });
    }

    if (
      this.props.destination !== prevProps.destination ||
      this.props.stops !== prevProps.stops
    ) {
      this.setState({ directions: null, textDirections: false });

      console.log('updating?', this.props.stops);
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

          waypoints: this.props.stops.map((stop) => {
            // console.log(stop.lat);
            return {
              location: new window.google.maps.LatLng(stop.lat, stop.lng),
            };
          }),
          travelMode: 'DRIVING',
          optimizeWaypoints: true,
        },
        (result, status) => {
          // console.log("this is steps", result.routes[0].legs[0].steps);

          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState(
              {
                directions: { ...result },
                textDirections: true,
                // polyline: result.routes[0].overview_polyline,
              },
              () => {
                console.log('state>>>>', this.state.textDirections);
              }
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
        {this.state.directions && (
          <DirectionsRenderer
            defaultDirections={this.state.directions}
            panel={document.getElementById('panel')}
          />
        )}

        {this.state.directions && <div id="panel">Text directions </div>}
      </div>
    );
  }
}

export default RouteCalculator;
