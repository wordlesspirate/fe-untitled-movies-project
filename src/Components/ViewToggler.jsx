import React, { Component } from "react";
import { Button } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import CloseIcon from "@material-ui/icons/Close";
class ViewToggler extends Component {
  state = { isVisible: true };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#041B15", width: "100%", height: "15%" }}>
        <Button onClick={this.handleClick}>
          {this.state.isVisible ? (
            <CloseIcon fontSize="large" color="secondary" />
          ) : (
            <MenuOutlinedIcon color="secondary" fontSize="large" />
          )}
        </Button>
        {this.state.isVisible && this.props.children}
      </div>
    );
  }
}

export default ViewToggler;
