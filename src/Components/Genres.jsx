import React from "react";
import axios from "axios";
import config from "../config.json";

class Genres extends React.Component {
  state = {
    genres: [],
    username: "paulie1",
    i: 0,
    genre1: "",
    g1_avatar: "",
    genre2: "",
    g2_avatar: "",
    genre3: "",
    g3_avatar: "",
  };

  fetchGenres = async () => {
    try {
      const response = await axios.get(`${config.api.invokeURL}/genres/`);
      const genres = response.data;

      this.setState({ genres: genres });
    } catch (err) {
      //ERROR HANDLING
      console.dir(err);
      console.log(`An error has occurred: ${err}`);
    }
  };

  num = 1;
  selectedGenres = [];

  selectGenre = (event) => {
    // console.log(event.target, "< - - - event target");
    // console.dir(event.target, " < - - - event");
    // console.log(event, "<- - - -event");
    //const { i } = this.state;

    const genre = event.target.name;
    const avatar = event.target.src;

    //let num = 1;

    if (this.num < 4) {
      this.selectedGenres.push(
        `{ genre${this.num}: ${genre}, g${this.num}_avatar: ${avatar} }`
      );

      this.num++;

      console.log(this.num, "end");
      console.log(this.selectedGenres, "selectedGenre Array");
    console.log(this.selectedGenres, "array outside if");

    // if (i === 0) {
    //   this.setState({ genre1: genre, g1_avatar: avatar, i: 1 });
    // }
    // if (i === 1) {
    //   this.setState({ genre2: genre, g2_avatar: avatar, i: 2 });
    // }
    // if (i === 2) {
    //   this.setState({ genre3: genre, g3_avatar: avatar, i: 0 });
    //   this.updateProfile();
    // }
  };

  // need current logged in user
  updateProfile = async () => {
    // this.state.username ,genre, avatar
    const {
      username,
      genre1,
      g1_avatar,
      genre2,
      g2_avatar,
      genre3,
      g3_avatar,
    } = this.state;
    try {
      const params = {
        username: username,
        genre1: genre1,
        g1_avatar: g1_avatar,
        genre2: genre2,
        g2_avatar: g2_avatar,
        genre3: genre3,
        g3_avatar: g3_avatar,
      };

      console.log(params, "params");

      await axios.patch(`${config.api.invokeURL}/profile/${username}`, params);
    } catch (err) {
      //ERROR HANLDE
      console.log(err);
      console.dir(err);
    }
  };
  componentDidMount() {
    this.fetchGenres();
  }

  render() {
    return (
      <>
        <main>
          <div className={"genre-header"}>
            <h1>Select your 3 favourite genres</h1>
          </div>
          <div className={"genre-selection"} disabled={this.state.i > 2}>
            {this.state.genres.map(({ genre, g_avatar }, i) => {
              return (
                <button onClick={this.selectGenre} key={i}>
                  {genre}

                  <img
                    name={genre}
                    alt="genre-avatar"
                    // value={g_avatar}
                    // src="https://img.icons8.com/nolan/64/react-native.png"
                    src={g_avatar}
                  />
                </button>
              );
            })}
            <a href="/profile">Back to Profile</a>
          </div>
        </main>
      </>
    );
  }
}

export default Genres;
