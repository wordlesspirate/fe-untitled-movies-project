import React from "react";
import { Auth } from "aws-amplify";

import "typeface-roboto";
import {
  Button,
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 8, 2),
  },
  submitbutton: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  account: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

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
    const { classes } = this.props;
    return (

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Typography component="h6" variant="h2">
              Sign in ...
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"

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
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="email"
              autoFocus
            ></TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.password}
              onChange={this.handleChange}

              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            ></TextField>
            <Grid item className={classes.submitbutton}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
            <Grid item className={classes.account}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </form>
        </div>
      </Container>

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

export default withStyles(useStyles)(Login);
