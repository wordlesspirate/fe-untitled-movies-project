import React, { Component } from "react";
// import "./App.css";


// //import MovieMap from './Components/MovieMap';
// import WrappedMap from "./Components/MovieMap";
// import APIKey from "./config";
// import Header from "./Header";
// import LocationMarkers from "./Components/LocationMarkers";
// import MovieResponse from "./Components/MovieResponse";
// import Dashboard from "./Components/Dashboard";
import SimpleReactLightbox from "simple-react-lightbox";
// import MovieMap from "./Components/MovieMap";

//import MovieMap from './Components/MovieMap';
// import WrappedMap from "./Components/MovieMap";
// import APIKey from "./config";
// import Header from "./Components/Header";
// import LocationMarkers from "./Components/LocationMarkers";
import MovieResponse from "./Components/MovieResponse";
import Dashboard from "./Components/Dashboard";

// import UserLocation from "./Components/UserLocation";

// import MovieMap from "./Components/MovieMap";
// import Register from "./Components/Register";
// import Welcome from "./Components/Welcome";
// import Login from "./Components/Login";
// import { Router } from "@reach/router";
// import { Auth } from "aws-amplify";
// import Home from "./Components/Home";

import Home from "./Components/Home";
import MovieMap from "./Components/MovieMap";

import Register from "./Components/Register";
// import Welcome from "./Components/Welcome";
import Login from "./Components/Login";

import { Router, Link } from "@reach/router";
import { Auth } from "aws-amplify";
import Home from "./Components/Home";
import Gallery from "./Components/Gallery";
import Usercamera from "./Components/Usercamera";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthenticated: this.setAuthStatus,
      userInfo: this.setUser,
    };
    console.log(SimpleReactLightbox);
    return (
      !this.state.isAuthenticating && (
        <div>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Home</Link>
            <Link to="/userCamera">Camera</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
          <Router>
            <Login auth={authProps} path="/" />
            <Register
              userProps={this.props}
              auth={authProps}
              path="/register"
            />
            <Home auth={authProps} path="home" />
            <Usercamera auth={authProps} path="userCamera" />
            <Gallery auth={authProps} path="gallery" />
          </Router>
          <div></div>
        </div>
      )
import Genres from "./Components/Genres";
import { Router } from "@reach/router";
import { Auth } from "aws-amplify";
import Profile from "./Components/Profile";


class App extends Component {
  state = {};

  render() {
    return (

      <>
        {/* <Dashboard /> */}

        <Dashboard />
        <MovieResponse />
        {/*<MovieMap /> */}
        {/* <LocationMarkers /> */}

        {/* <div>
          <Router>
            <MovieMap path="/map" />
          </Router>
          <Register />
          <Welcome />
          <Login />
          <Home />
        </div> */}
      </>

      <div className={"AppMain"}>
        <Home />
        <Router>
          <Profile path="/profile/*" />
          <Genres path="/profile/genres" />
          {/* <Genres path="/genres" /> */}

          {/* <MovieMap path="/map" /> */}
          {/* <LocationMarkers /> */}
          {/* <Dashboard /> */}
          {/* {<MovieResponse /> */}
        </Router>

        <Register />
        <Welcome />
        <Login />

      </div>


    );
  }
}

export default App;
