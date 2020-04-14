import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import UserLocation from "./UserLocation";
import * as api from "../Utils/api";
class NewMovieMap extends Component {
  state = { coordinate: null, address: null };

  fetchAddress = (coordinate) => {
    api.getAddress(coordinate).then((address) => {
      this.setState({ address });
    });
  };

  displayMarkers = () => {
    // return (
    //   <Marker
    //     position={{
    //       lat: 40.7127753,
    //       lng: -74.0059728,
    //     }}
    //   />
    //);
    // console.log("from display markers >>>>", this.props.coordinates);

    return this.props.coordinates.map((coordinate, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{ lat: coordinate.lat, lng: coordinate.lng }}
          onClick={() =>
            this.setState({ coordinate }, this.fetchAddress(coordinate))
          }
        />
      );
    });
  };
  componentDidMount() {
    this.displayMarkers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) this.displayMarkers();
  }

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={6}
          defaultCenter={{ lat: 53.800739, lng: -1.549144 }}
        >
          {this.displayMarkers()}
          {this.state.coordinate && (
            <InfoWindow
              position={{
                lat: this.state.coordinate.lat,
                lng: this.state.coordinate.lng,
              }}
              onCloseClick={() => this.setState({ coordinate: null })}
            >
              <p>
                Once we figure it out, addresses and other relevant info goes
                here!
              </p>
            </InfoWindow>
          )}
        </GoogleMap>
        <UserLocation coordinates={this.props.coordinates} />
      </div>
    );
  }
}

const NewWrappedMap = withScriptjs(withGoogleMap(NewMovieMap));

export default NewWrappedMap;
