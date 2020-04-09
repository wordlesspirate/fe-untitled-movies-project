import React, { Component } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  LatLng,
} from 'google-maps-react';
import APIKey from '../config';

class RouteCalculator extends Component {
  state = {
    directions: null,
  };
  //   initMap() {
  //     let directionsService = new google.maps.DirectionsService();
  //     let directionsRenderer = new google.maps.DirectionsRenderer();

  //     const start = new google.maps.LatLng(53.960192, -1.092438);

  //     const map = new google.maps.Map();
  //   }

  //  directionService = new google.maps.DirectionsService()
  //  directionService.route({
  //      origin
  //  })

  render() {
    return (
      <div>
        <DirectionsService
          origin={}
          destination={(53.955755, -1.078316)}
        ></DirectionsService>
      </div>
    );
  }
}

export default RouteCalculator;
