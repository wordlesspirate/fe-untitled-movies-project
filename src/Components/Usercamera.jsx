import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Picture from "./Picture";
import ReactS3 from "react-s3";
import keys from "../keys.json";

class Usercamera extends Component {
  state = {
    picData: "",
  };

  handleTakePhoto = (dataUri) => {
    const username = this.props.auth.user.username;
    const filename = `${Math.floor(Math.random() * 10000000000).toString()}`;
    const config = { ...keys.aws, dirName: username };

    const file = new File([dataUri], filename, {
      type: ".jpg",
    });

    ReactS3.uploadFile(file, config)
      .then((data) => {
        console.log("done it");
      })
      .catch((err) => {
        alert(err);
      });
    this.setState({ picData: dataUri });
  };

  handleTakePhotoAnimationDone = (dataUri) => {
    console.log("takePhoto");
  };

  handleCameraError = (error) => {
    console.log("handleCameraError", error);
  };

  handleCameraStart = (stream) => {
    console.log("handleCameraStart");
  };

  handleCameraStop = () => {
    console.log("handleCameraStop");
  };

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri) => {
            this.handleTakePhoto(dataUri);
          }}
          onTakePhotoAnimationDone={(dataUri) => {
            this.handleTakePhotoAnimationDone(dataUri);
          }}
          onCameraError={(error) => {
            this.handleCameraError(error);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          idealResolution={{ width: 640, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={true}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={false}
          sizeFactor={1}
          onCameraStart={(stream) => {
            this.handleCameraStart(stream);
          }}
          onCameraStop={() => {
            this.handleCameraStop();
          }}
        />
        <Picture photo={this.state.picData} />
      </div>
    );
  }
}

export default Usercamera;
