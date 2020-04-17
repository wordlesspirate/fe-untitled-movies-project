import React, { Component } from "react";
import { Auth } from "aws-amplify";

class Navbar extends Component {
  handleLogOut = async (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthenticated(false);
      this.props.auth.userInfo(null);
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
          <a href="/profile">My Profile</a>

          {/* {this.props.auth.isAuthenticated && this.props.auth.user && (
              <a href="/profile">{this.props.auth.user.username}</a>
            )} */}

          {/* {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/">Log in</a>
                  </div>
                )} */}
          {this.props.auth.isAuthenticated ? (
            <a href="/" onClick={this.handleLogOut}>
              Log out
            </a>
          ) : (
            <a href="/">Log in</a>
          )}
        </div>
      </nav>
    );
  }
}
export default Navbar;
