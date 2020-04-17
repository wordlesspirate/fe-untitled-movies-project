import React, { Component } from "react";
import ImageCard from "./ImageCard";
import ErrorHandler from "./ErrorHandler";
const aws = require("aws-sdk");

const config = require("../config.json");

class Gallery extends Component {
  state = {
    userPics: [],
    isLoading: true,
    error: null,
  };

  getImages = async () => {
    try {
      aws.config.update({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
        region: config.aws.region,
      });

      const userFolder = `${this.props.auth.user.username}/`;
      const s3 = new aws.S3();

      await s3
        .listObjectsV2({
          Bucket: "movieapp-users-images",
          Prefix: userFolder,
        })
        .promise()
        .then((data) => {
          this.setState({ userPics: data.Contents, isLoading: false });
        });
    } catch (error) {
      const message =
        "We have not being able to fetch your photos, please go back to your profile and try again";
      this.setState({
        error: { message },
      });
    }
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    if (this.state.isLoading) return "Loading ....";
    if (!this.state.isLoading) {
      return (
        <>
          <div>
            <h1>Gallery</h1>
            <div>
              {this.state.userPics.length === 0
                ? "You have not snapped any shots!"
                : ""}
            </div>
            <ErrorHandler apierrors={this.state.error} />
            <ul>
              {this.state.userPics.map((item) => {
                return (
                  <li key={item.Key}>
                    <ImageCard imageKey={item.Key} />
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    }
  }
}

export default Gallery;
