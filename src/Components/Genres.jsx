import React from "react";
import axios from "axios";
import config from "../config.json";
//import { Link } from "@reach/router";

class Genres extends React.Component {
  state = {
    genres: [],
    username: this.props.auth.user.username,
    //username: "paulie1",
    num: 1,
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

  selectGenre = (event) => {
    let { num } = this.state;
    const genre = event.target.name;
    const avatar = event.target.src;

    if (num < 4) {
      console.log(num);
      if (num === 1) {
        this.setState({ genre1: genre, g1_avatar: avatar, num: 2 });
        console.log(
          this.state.genre1,
          this.state.g1_avatar,
          "after setstate 1",
          num,
          "num"
        );
      }

      if (num === 2) {
        this.setState({ genre2: genre, g2_avatar: avatar, num: 3 });
        console.log(
          this.state.genre2,
          this.state.g2_avatar,
          "after setstate 2",
          num,
          "num"
        );
      }

      if (num === 3) {
        console.log(num, "num in this");
        this.setState({ genre3: genre, g3_avatar: avatar, num: 4 });
        console.log(
          this.state.genre3,
          this.state.g3_avatar,
          "after setstate 3",
          num,
          "num"
        );
      }
      // ++num;
    }
  };

  saveGenres = () => {
    const { genre1, genre2, genre3 } = this.state;
    if (genre1 === "" || genre2 === "" || genre3 === "") {
      console.log(genre1, "g1,", genre2, "g2", genre3, "g3");

      console.log("select another movie");
    } else {
      this.updateProfile();
      console.log(this.state.genre1, this.state.genre2, this.state.genre3);
      this.setState({
        num: 1,
        genre1: "",
        g1_avatar: "",
        genre2: "",
        g2_avatar: "",
        genre3: "",
        g3_avatar: "",
      });
    }
  };

  updateProfile = async () => {
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
                <button
                  //disabled={this.num === 4}
                  onClick={this.selectGenre}
                  key={i}
                >
                  {genre}

                  <img name={genre} alt="genre-avatar" src={g_avatar} />
                </button>
              );
            })}

            {/* <Link to="/profile"> */}
            <button onClick={this.saveGenres}>Save</button>
            {/* </Link> */}
          </div>
        </main>
      </>
    );
  }
}

export default Genres;
