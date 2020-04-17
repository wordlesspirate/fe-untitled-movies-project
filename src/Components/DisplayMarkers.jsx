// import React, { Component } from "react";
// import { Marker } from "react-google-maps";

// class DisplayMarkers extends Component {
//   displayMarkers = () => {
//     console.log("from display markers >>>>", this.props);
//     return this.props.coordinates.map((coordinate, index) => {
//       return (
//         <Marker
//           key={index}
//           id={index}
//           position={{
//             lat: coordinate.lat,
//             lng: coordinate.lng,
//           }}
//           onClick={() => console.log("You clicked me!")}
//         />
//       );
//     });
//   };
//   componentDidMount() {
//     // console.log(this);
//     this.displayMarkers();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.coordinates !== prevProps.coordinates) this.displayMarkers();
//   }

//   render() {
//     return <div>{this.displayMarkers}</div>;
//   }
// }

// export default DisplayMarkers;
