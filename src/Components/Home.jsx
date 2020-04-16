import React, { Component } from "react";

class Home extends Component {
  render() {
    return <div> WELCOME {this.props.auth.user.username}</div>;
  }
}

export default Home;
