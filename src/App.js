import React, { Component } from "react";
import "./App.css";

// //import MovieMap from './Components/MovieMap';
// import WrappedMap from "./Components/MovieMap";
// import APIKey from "./config";
// import Header from "./Header";
// import LocationMarkers from "./Components/LocationMarkers";
// import MovieResponse from "./Components/MovieResponse";
// import Dashboard from "./Components/Dashboard";

// import MovieMap from "./Components/MovieMap";
import Register from "./Components/Register";
// import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import { Router, Link } from "@reach/router";
import { Auth } from "aws-amplify";
import Home from "./Components/Home";

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

    return (
      !this.state.isAuthenticating && (
        <div>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/home">Home</Link>
          </nav>
          <Router>
            <Login auth={authProps} path="/" />
            <Register
              userProps={this.props}
              auth={authProps}
              path="/register"
            />
            <Home auth={authProps} path="home" />
          </Router>
          <div></div>
        </div>
      )
    );
  }
}

export default App;
