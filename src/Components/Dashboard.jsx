import React from "react";
import Header from "./Header";
// import SearchMovie from "./SearchMovie";
// import WrappedMap from "./MovieMap";
// import APIKey from "../config";
import SearchMovie from "./SearchMovie";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography variant="body2" color="text" align="center">
        <Header />
      </Typography>
      <SearchMovie />
    </Container>
  );
};

export default Dashboard;
