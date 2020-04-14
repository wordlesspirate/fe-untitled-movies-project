import React, { Component } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps';
import UserLocation from './UserLocation';

class NewMovieMap extends Component {
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
          onClick={() => console.log('You clicked me!')}
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
        </GoogleMap>
        <UserLocation coordinates={this.props.coordinates} />
      </div>
    );
  }
}

const NewWrappedMap = withScriptjs(withGoogleMap(NewMovieMap));

export default NewWrappedMap;
