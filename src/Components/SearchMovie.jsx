import React, { Component } from "react";
import { getMovieId, getMovieLocations } from "../Utils/movies";

class SearchMovie extends Component {
  state = { movie: "" };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ movie: value }, () => {
      console.log(this.state.movie);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    getMovieId(this.state.movie).then((response) => {
      console.log(response);
      return response;
    });
    //   getMovieLocations().then((address) => {
    //    this.setState({ address }, () => {
    //      console.log(this.state.address);
    //    });
    //  });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="movie-search"
          type="text"
          onChange={this.handleChange}
        ></input>
        <button id="movie-search">Search Movie</button>
      </form>
    );
  }
}

export default SearchMovie;
