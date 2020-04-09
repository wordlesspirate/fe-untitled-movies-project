import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import config from "../config.json";

class Register extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordMatch: false,
    },
  };
  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  addUser = async (username, email, password, name) => {
    const id = Math.floor(Math.random() * 10000000000).toString();
    try {
      const params = {
        id: id,
        name: name,
        username: username,
        email: email,
        password: password,
      };
      await axios.post(`${config.api.invokeURL}/users`, params);
    } catch (err) {
      //ERROR HANDLING HERE
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, name } = this.state;

    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        name,
        attributes: {
          email: email,
        },
      }).then((data) => {
        this.addUser(username, email, password, name);
      });
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />
          <label>
            Username:
            <input
              name="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
            ></input>
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
          </label>
          <b />
          <label>
            Password:
            <input
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Confirm Password:
            <input
              name="confirmpassword"
              required
              value={this.state.confirmpassword}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Name:
            <input
              name="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </label>
          <br />
          <button type="submit">Create User</button>
        </form>
      </div>
    );
  }
}
export default Register;
