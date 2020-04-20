import React from "react";
import Header from "./Header";
// import SearchMovie from "./SearchMovie";
// import WrappedMap from "./MovieMap";
// import APIKey from "../config";
import SearchMovie from "./SearchMovie";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/core/styles";

// const useStyles = (theme) => ({
//   background: {
//     backgroundColor: theme.background.option1.lightBlue,
//   },
// });

const Dashboard = () => {
  // const { classes } = useStyles();
  return (
    <>
      <Header />
      <SearchMovie />
    </>
  );
};

// import React from 'react';
// import Header from './Header';
// // import SearchMovie from "./SearchMovie";
// // import WrappedMap from "./MovieMap";
// // import APIKey from "../config";
// import SearchMovie from './SearchMovie';

// const Dashboard = () => {
//   return (
//     <div>
//       <Header />
//       {/* <div style={{ width: "75%", height: "100vh" }}>
//         <WrappedMap
//           googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${APIKey}`}
//           loadingElement={<div style={{ height: "100" }} />}
//           containerElement={<div style={{ height: "100%" }} />}
//           mapElement={<div style={{ height: "100%" }} />}
//         />
//       </div> */}
//       <SearchMovie setMovieId={this.props.setMovieId} />
//     </div>
//   );
// };

// export default withStyles(useStyles)(Dashboard);

export default Dashboard;
