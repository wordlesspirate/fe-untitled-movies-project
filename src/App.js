import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Gallery from './Components/Gallery';
import Usercamera from './Components/Usercamera';
import Genres from './Components/Genres';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    isNavBarHidden: true,
    user: null,
    movieId: null,
  };

  hideNav = (bool) => {
    console.log(bool);
    this.setState({ isNavBarHidden: bool });
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
      isNavBarHidden: this.state.isNavBarHidden,
      hideNav: this.hideNav,
      setAuthenticated: this.setAuthStatus,
      userInfo: this.setUser,
    };

    return (
      !this.state.isAuthenticating && (
        <div className={'App'}>
          <Router>
            <div>

              {this.state.isNavBarHidden === true ? null : (
                <Navbar auth={authProps} />
              )}


      //check this bit
              <Navbar auth={authProps} />
 //this bit above
              <Switch primary={false}>
                <Route
                  exact
                  path="/"
                  render={(props) => <Login {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={(props) => (
                    <Register
                      auth={authProps}
                      {...props}
                      userProps={this.props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/home"
                  render={(props) => <Home auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/userCamera"
                  render={(props) => <Usercamera auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/gallery"
                  render={(props) => <Gallery auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/maps"
                  render={(props) => <Dashboard auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/profile"
                  render={(props) => <Profile auth={authProps} {...props} />}
                />
                <Route
                  exact
                  path="/profile/genres"
                  render={(props) => <Genres auth={authProps} {...props} />}
                />
              </Switch>
            </div>
          </Router>
        </div>
      )
    );
  }
}
export default App;
