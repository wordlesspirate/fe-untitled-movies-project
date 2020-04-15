import React, { Component } from "react";
import aws from "aws-sdk";
import { SRLWrapper } from "simple-react-lightbox";

class ImageCard extends Component {
  state = {
    isLoading: true,
    img: "",
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
      .catch((err) => {
        console.dir(err);
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
          <SRLWrapper>
            <img src={`${image.src}`} style={{ width: "30%" }} />
          </SRLWrapper>
        </div>
      );
    }
  }
}

export default ImageCard;
