import React from "react";
import { Auth } from "aws-amplify";
class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errors: "",
  };
  handleChange = (event) => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      // this.props.auth.setAuthStatus(true);
      // this.props.auth.setUser(user);
    } catch (error) {
      console.dir(error);
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
        </form>
      </div>
    );
  }
}
export default Login;
