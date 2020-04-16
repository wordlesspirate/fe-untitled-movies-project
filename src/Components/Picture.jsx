import React, { Component } from "react";

class Picture extends Component {
  render(props) {
    const image = new Image();
    image.src = this.props.photo;
    return (
      <div>
        <p>IMAGE SAVED TO S3</p>
        <img
          alt={"user-images"}
          src={`${image.src}`}
          style={{ width: "30%" }}
        />
      </div>
    );
  }
}

export default Picture;
