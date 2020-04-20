import React from "react";
import { Auth } from "aws-amplify";
import axios from "axios";
import config from "../config.json";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    margin: theme.spacing(3, 0, 2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class Register extends React.Component {
  state = {
    username: "",
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
    errors: {
      cognito: null,
      passwordmatch: false,
    },
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,

        passwordmatch: false,
      },
    });
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
    } catch (error) {
      let err = null;
      console.dir(error);
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  addProfile = async (username) => {
    const profile_id = Math.floor(Math.random() * 10000).toString();

    try {
      const params = {
        profile_id: profile_id,
        username: username,
      };
      await axios.post(`${config.api.invokeURL}/profile/`, params);
    } catch (error) {
      let err = null;
      console.dir(error);
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  handleSubmit = async (event) => {
    console.log("IM FURRNING THIS IT");
    event.preventDefault();
    this.clearErrorState();
    const { username, email, password, name } = this.state;

    try {
      await Auth.signUp({
        username,
        password,
        name,
        attributes: {
          email: email,
        },
      }).then((data) => {
        this.addUser(username, email, password, name);
        this.addProfile(username);
        this.props.history.push("/");
      });
    } catch (error) {
      let err = null;
      console.dir(error);
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
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography color="primary" component="h6" variant="h2">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.email}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.password}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.name}
                  onChange={this.handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="name"
                  label="your name"
                  type="name"
                  id="name"
                  autoComplete="your name"
                />
              </Grid>
              <Grid className={classes.submitButton} item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>

      // <ErrorHandler formerrors={this.state.errors} />
    );
  }
}

export default withStyles(useStyles)(Register);
