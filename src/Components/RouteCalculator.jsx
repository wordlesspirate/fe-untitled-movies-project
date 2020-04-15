import React, { Component } from "react";
import {
  // GoogleMap,
  // Marker,
  // DirectionsService,
  DirectionsRenderer,
  // LatLng,
} from "react-google-maps";
// import APIKey from "../config";

class RouteCalculator extends Component {
  state = {
    userLocation: null,
    directions: null,
    polyline: null,
  };

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
      console.log("updating?", this.props.stops);
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
          // waypoints: this.props.stops,

          waypoints: this.props.stops.map((stop) => {
            // console.log(stop.lat);
            return {
              location: new window.google.maps.LatLng(stop.lat, stop.lng),
            };
          }),
          travelMode: "DRIVING",
        },
        (result, status) => {
          // console.log("this is steps", result.routes[0].legs[0].steps);

          if (status === "OK") {
            this.setState(
              {
                directions: result,
                // polyline: result.routes[0].overview_polyline,
              },
              () => {
                console.log("this is result", result);
              }
            );
          } else {
            console.dir("console.dir", result);
          }
        }
      );
    }
    // if (this.props.stops !== prevProps.stops) {
    //   console.log("updating?", this.props.stops);
    //   const DirectionsService = new window.google.maps.DirectionsService();

    //   DirectionsService.route(
    //     {
    //       origin: new window.google.maps.LatLng(
    //         this.state.userLocation.lat,
    //         this.state.userLocation.lng
    //       ),
    //       destination: new window.google.maps.LatLng(
    //         this.props.destination.lat,
    //         this.props.destination.lng
    //       ),
    //       waypoints: this.props.stops.map((stop) => {
    //         console.log(stop.lat);
    //         return {
    //           location: new window.google.maps.LatLng(stop.lat, stop.lng),
    //         };
    //       }),
    //       travelMode: "DRIVING",
    //     },
    //     (result, status) => {
    //       // console.log("this is steps", result.routes[0].legs[0].steps);

    //       if (status === "OK") {
    //         this.setState(
    //           {
    //             directions: result,
    //             polyline: result.routes[0].overview_polyline,
    //           },
    //           () => {
    //             console.log("investigating polyline", result);
    //           }
    //         );
    //       } else {
    //         console.dir("console.dir", result);
    //       }
    //     }
    //   );
    // }
  }

  render() {
    return (
      <div>
        {" "}
        {this.state.directions && (
          <DirectionsRenderer defaultDirections={this.state.directions} />
        )}{" "}
      </div>
    );
  }
}

export default RouteCalculator;

// waypoints: [
//   {
//     location: new google.maps.LatLng(14.546748, 121.05455),
//   },
//   {
//     location: new google.maps.LatLng(14.552444, 121.044488),
//   },
// ];
