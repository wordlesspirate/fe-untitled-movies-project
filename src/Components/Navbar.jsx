import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as useHistory } from "react-router-dom";
import "typeface-roboto";
import { Link, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
  root: {
    color: "white",
  },
  input: {
    color: "white",
  },
});

class Navbar extends Component {
  handleLogOut = async (event) => {
    const history = useHistory();
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthenticated(false);
      this.props.auth.userInfo(null);

      history.push("/");
      this.props.hideNav(true);
    } catch (error) {
      console.dir(error);
      console.log(error);
      console.log(error.message);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Link color="secondary" href="/home">
            Home
          </Link>
          <Link color="secondary" href="/maps">
            Map
          </Link>
          <Link color="secondary" href="/userCamera">
            Camera
          </Link>
          <Link color="secondary" href="/gallery">
            Gallery
          </Link>
          <Link color="secondary" href="/profile">
            Profile
          </Link>
          <Link color="secondary" href="/" onClick={this.handleLogOut}>
            Log Out
          </Link>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(Navbar);
