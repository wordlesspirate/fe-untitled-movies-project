import React from "react";
import axios from "axios";
import config from "../config.json";
import { Link } from "@reach/router";

import "../App.css";

class Profile extends React.Component {
  state = {
    profile: {},
    genres: [],
    // username needs to come from current session
    username: "paulie1",
    //username: "justin24" -- no genre's set up,
    //username: "justin24",
  };

  fetchProfile = async () => {
    try {
      const res = await axios.get(
        // this needs current user in seession
        `${config.api.invokeURL}/profile/${this.state.username}`
      );

      const profile = res.data;
      this.setState({ profile: profile });
    } catch (err) {
      //ERROR HANDLING
      console.dir(err);
      console.log(`An error has occurred: ${err}`);
    }
  };

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    const {
      username,
      genre1,
      genre2,
      genre3,
      avatar_url,
      g1_avatar,
      g2_avatar,
      g3_avatar,
    } = this.state.profile;

    return (
      <div>
        <section className={"profile-avatar"}>
          {!avatar_url ? (
            <img
              className={"profileimg"}
              alt="users-avatar"
              src="https://img.icons8.com/ios/100/fa314a/comedy.png"
            />
          ) : (
            <img alt="users-avatar" src={`${avatar_url}`} />
          )}
          <label htmlFor="profileimg">{username}</label>
        </section>
        <section className="profile-genres">
          <h2>Your favourite genres</h2>
          <div>
            {genre1}
            {!g1_avatar ? (
              <img
                className={"g-avatar"}
                alt="users-avatar"
                src="https://img.icons8.com/ios/100/fa314a/comedy.png"
              />
            ) : (
              <img alt="genre-avatar" src={g1_avatar} />
            )}
          </div>

          <div>
            {genre2}
            {!avatar_url ? (
              <img
                className={"g-avatar"}
                alt="users-avatar"
                src="https://img.icons8.com/ios/100/fa314a/comedy.png"
              />
            ) : (
              <img alt="users-avatar" src={g2_avatar} />
            )}
          </div>
          <div>
            {genre3}
            {!g3_avatar ? (
              <img
                className={"g-avatar"}
                alt="users-avatar"
                src="https://img.icons8.com/ios/100/fa314a/comedy.png"
              />
            ) : (
              <img alt="users-avatar" src={g3_avatar} />
            )}
          </div>
          <Link to="/profile/genres">Change your favourtie genres </Link>
        </section>
      </div>
    );
  }
}

export default Profile;
