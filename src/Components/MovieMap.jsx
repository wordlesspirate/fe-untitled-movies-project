import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
  // Polyline,
} from "react-google-maps";

class MovieMap extends Component {
  state = {
    movieLocations: [
      { lat: 53.955755, lng: -1.078316 },
      { lat: 53.959446, lng: -1.080061 },
    ],
    directions: null,
    // polyline: null,
    pathCoordinates: [
      { lat: 53.955755, lng: -1.078316 },
      { lat: 53.959446, lng: -1.080061 },
    ],
  };

  displayMarkers = () => {
    return this.state.movieLocations.map((movieLocation, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: movieLocation.lat,
            lng: movieLocation.lng,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  componentDidMount() {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(53.960192, -1.092438),
        destination: new window.google.maps.LatLng(53.959446, -1.080061),
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        // console.log(result);
        // console.log(result.routes[0].overview_polyline);
        if (status === "OK") {
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
          console.dir(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={6}
          // defaultCenter={{ lat: 53.960192, lng: -1.092438 }}
          defaultCenter={{ lat: 53.800739, lng: -1.549144 }}
        >
          {/* <Marker
            position={{ lat: 50.736129, lng: -1.988229 }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }} */}
          onClick={() => console.log("You clicked me!")}
          />
          {this.displayMarkers()}
          {/* {this.state.directions && (
            <DirectionsRenderer defaultDirections={this.state.directions} />
          )} */}
          {/* {this.state.polyline && <Polyline path={this.state.polyline} />} */}
          {/* 
          <Polyline
            path={this.state.pathCoordinates}
            options={{
              strokeColor: '#0000EE',
              strokeOpacity: 1,
              strokeWeight: 2,
              icons: [
                {
                  icon: 'hello',
                  offset: '0',
                  repeat: '10px',
                },
              ],
            }}
          /> */}
        </GoogleMap>
      </div>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(MovieMap));

export default WrappedMap;

// import React from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

// const MovieMap = () => {
//   return (
//     <div>
//       <GoogleMap
//         defaultZoom={11}
//         defaultCenter={{ lat: 53.960192, lng: -1.092438 }}
//       />
//     </div>
//   );
// };

// const WrappedMap = withScriptjs(withGoogleMap(MovieMap));

// export default WrappedMap;

// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import APIKey from '../config';

// class MovieMap extends Component {
//   state = {
//     movieLocations: [
//       { lat: 53.955755, lng: -1.078316 },
//       { lat: 53.959446, lng: -1.080061 },
//     ],
//   };

//   displayMarkers = () => {
//     return this.state.movieLocations.map((movieLocation, index) => {
//       return (
//         <Marker
//           key={index}
//           id={index}
//           position={{
//             lat: movieLocation.lat,
//             lng: movieLocation.lng,
//           }}
//           onClick={() => console.log('You clicked me!')}
//         />
//       );
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Map
//           google={this.props.google}
//           zoom={8}
//           style={mapStyles}
//           initialCenter={{ lat: 53.960192, lng: -1.092438 }}
//         >
//           <Marker
//             position={{ lat: 53.960192, lng: -1.092438 }}
//             icon={{
//               url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//             }}
//           />
//           {this.displayMarkers()}
//         </Map>
//       </div>
//     );
//   }
// }

// const mapStyles = {
//   width: '100%',
//   height: '100%',
// };

// export default GoogleApiWrapper({
//   apiKey: APIKey,
// })(MovieMap);
// export default GoogleApiWrapper({
//   apiKey: APIKey,
// })(MovieMap);
