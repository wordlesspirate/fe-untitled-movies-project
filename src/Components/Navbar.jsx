import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as useHistory } from "react-router-dom";

class Navbar extends Component {
  handleLogOut = async (event) => {
    const history = useHistory();
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthenticated(false);
      this.props.auth.userInfo(null);
      history.push("/");
    } catch (error) {
      console.dir(error);
      console.log(error);
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation">
        <div>
          <a href="/home">Home</a>
          <a href="/maps">Dashboard</a>
          <a href="/userCamera">Camera</a>
          <a href="/gallery">Gallery</a>
          <a href="/profile">My Profile</a>}
          {this.props.auth.isAuthenticated ? (
            <a href="/" onClick={this.handleLogOut}>
              Log out
            </a>
          ) : null}
        </div>
      </nav>
    );
  }
}
export default Navbar;
