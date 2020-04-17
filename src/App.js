import React, { Component } from 'react';
import './App.css';

// import SimpleReactLightbox from "simple-react-lightbox";
//import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Gallery from './Components/Gallery';
import Usercamera from './Components/Usercamera';
import Genres from './Components/Genres';
import Profile from './Components/Profile';
import MovieInformation from './Components/MovieInformation';
import SearchMovie from './Components/SearchMovie';

import { Router, Link } from '@reach/router';
import { Auth } from 'aws-amplify';
//import SearchMovie from './Components/SearchMovie';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    movieId: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  setMovieId = (movieId) => {
    this.setState({ movieId });
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      //ERROR HANDLE NEEDED
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

    return (
      !this.state.isAuthenticating && (
        <div>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Home</Link>
            <Link to="/userCamera">Camera</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/maps">Dashboard</Link>
          </nav>
          <Router>
            <Login auth={authProps} path="/" />

            <Register
              userProps={this.props}
              auth={authProps}
              path="/register"
            />
            {/* <Home auth={authProps} path="/home" />
            <Usercamera auth={authProps} path="/userCamera" />
            <Gallery auth={authProps} path="/gallery" /> */}
            <SearchMovie
              auth={authProps}
              setMovieId={this.setMovieId}
              path="/maps"
            />
            {/* <Profile auth={authProps} path="/profile/*" />
            <Genres auth={authProps} path="/profile/genres" /> */}
            <MovieInformation
              auth={authProps}
              movieId={this.state.movieId}
              path="/movie_information"
            />
          </Router>
          <div></div>
        </div>
      )
    );
  }
}
export default App;
