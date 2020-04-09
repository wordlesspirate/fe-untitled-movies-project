import React, { Component } from "react";
import "./App.css";
import MovieMap from "./Components/MovieMap";
import Register from "./Components/Register";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import { Router } from "@reach/router";
import { Auth } from "aws-amplify";
import Home from "./Components/Home";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
  };

  // setAuthStatus = (authenticated) => {
  //   console.log(authenticated);
  //   this.setState({ isAuthenticated: authenticated });
  // };

  // setUser = (user) => {
  //   this.setState({ user: user });
  // };

  // async componentDidMount() {
  //   try {
  //     const session = await Auth.currentSession();
  //     this.setAuthStatus(true);
  //     console.log("doing this bit");
  //     console.log(session);
  //     const user = await Auth.currentAuthenticatedUser();
  //     this.setUser(user);
  //   } catch (error) {
  //     if (error !== "No current user") {
  //       console.log(error);
  //     }
  //   }

  //   this.setState({ isAuthenticating: false });
  // }

  render() {
    return (
      <div>
        <Router>
          <MovieMap path="/map" />
        </Router>
        <Register />
        <Welcome />
        <Login />
        <Home />
      </div>
    );
  }
}

export default App;
