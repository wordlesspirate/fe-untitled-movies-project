import React, { Component } from "react";
import ImageCard from "./ImageCard";
const aws = require("aws-sdk");
//const config = require("../keys.json");
const config = require("../config.json");

class Gallery extends Component {
  state = {
    userPics: "",
    isLoading: true,
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
      console.log(error);
    }
  };

  componentDidMount() {
    this.getImages();
  }

  render() {
    if (this.state.isLoading) return "Loading ....";
    if (!this.state.isLoading) {
      //const pic = this.state.userPics.Key;
      return (
        <ul>
          {this.state.userPics.map((item) => {
            return (
              <li key={item.Key}>
                <ImageCard imageKey={item.Key} />
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

export default Gallery;
