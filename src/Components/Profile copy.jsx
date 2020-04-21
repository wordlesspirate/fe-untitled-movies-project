import React from "react";
import axios from "axios";
import config from "../config.json";
import Avatar from "@material-ui/core/Avatar";
import ErrorHandler from "./ErrorHandler";

import "../App.css";
// Remove below import?
// import { Link } from "@reach/router";
// Import for basic profile
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  account: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 322,
  },
  media: {
    width: 322,
    height: 322,
    objectFit: "contain",
  },
  cardContent: {
    flexGrow: 1,
  },
});

// previous code starts here
class Profile extends React.Component {
  state = {
    profile: {},
    genres: [],
    username: this.props.auth.user.username,
    error: null,
  };

  fetchProfile = async () => {
    const { username } = this.state;
    console.log(username);
    try {
      const res = await axios.get(
        `${config.api.invokeURL}/profile/${this.state.username}`
      );

      const profile = res.data;
      this.setState({ profile: profile });
    } catch (error) {
      const message =
        "We have not being able to fetch your profile, please log out and try again.";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    console.log("fetching genres?");
    this.fetchProfile();
  }

  render() {
    const { classes } = this.props;

    const {
      genre1,
      genre2,
      genre3,
      avatar_url,
      g1_avatar,
      g2_avatar,
      g3_avatar,
    } = this.state.profile;

    const cards = [
      {
        genre: genre1,
        image: g1_avatar,
      },
      {
        genre: genre2,
        image: g2_avatar,
      },
      {
        genre: genre3,
        image: g3_avatar,
      },
    ];

    return (
      <>
        <ErrorHandler apierrors={this.state.error} />
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Navbar goes here
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="xs">
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="textSecondary"
                gutterBottom
              >
                {`Hello, ${this.state.username}`}
              </Typography>
              <div className={classes.root}>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={require("./starw.png")}
                />
              </div>
              <Grid item className={classes.account}>
                <Link href="#" variant="body2">
                  {"Edit Avatar"}
                </Link>
              </Grid>
            </Container>
          </div>
          <Container className={classes.cardGrid} spacing={2}>
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              Favorite Genres
            </Typography>
            <Grid container spacing={4}>
              {cards.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      component="img"
                      alt=""
                      image={card.image}
                      title=""
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        align="justify"
                      >
                        {card.genre}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid item className={classes.account}>
              <Link href="/profile/genres" variant="body2">
                {"Edit Genres"}
              </Link>
            </Grid>
          </Container>
        </main>
      </>
    );
  }
}

export default withStyles(useStyles)(Profile);
