import React, { Component } from "react";
import ErrorHandler from "./ErrorHandler";
import aws from "aws-sdk";
import { SRLWrapper } from "simple-react-lightbox";

class ImageCard extends Component {
  state = {
    isLoading: true,
    img: "",
    error: null,
  };

  getImage = () => {
    const s3 = new aws.S3();
    const params = {
      Bucket: "movieapp-users-images",
      Key: this.props.imageKey,
    };

    s3.getObject(params)
      .promise()
      .then((response) => {
        this.setState({ isLoading: false, img: response.Body.toString() });
      })
      .catch((error) => {
        const message =
          "We have not being able to load your image, please go back to your profile and try again";
        this.setState({
          error: { message },
        });
      });
  };

  componentDidMount() {
    this.getImage();
  }

  render() {
    if (this.state.isLoading) return "Loading ....";
    if (!this.state.isLoading) {
      const image = new Image();
      image.src = this.state.img;
      return (
        <div>
          <ErrorHandler apierrors={this.state.error} />
          <SRLWrapper>
            <img
              alt={"user-img"}
              src={`${image.src}`}
              style={{ width: "100%" }}
            />
          </SRLWrapper>
        </div>
      );
    }
  }
}

export default ImageCard;
