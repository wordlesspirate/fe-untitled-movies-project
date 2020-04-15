import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    return (
      <main>
        WELCOME
        <div>
          <Link to="/profile">
            <button>My Profile</button>
          </Link>
        </div>
      </main>
    );
  }
}

export default Home;
