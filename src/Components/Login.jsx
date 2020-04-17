import React from "react";
import { Auth } from "aws-amplify";
import ErrorHandler from "./ErrorHandler";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
      },
    });
  };
  handleChange = (event) => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.clearErrorState();
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      this.props.auth.setAuthenticated(true);
      this.props.auth.userInfo(user);
      this.props.history.push("/home");
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };
  render() {
    return (
      <div>
        <h1>Log in</h1>
        <ErrorHandler formerrors={this.state.errors} />
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
            Password:
            <input
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
          </label>
          <br />

          <button type="submit">Login</button>

          <h6>Register your account</h6>
          <a href="/register">Sign Up Here</a>
        </form>
      </div>
    );
  }
}
export default Login;
