import React, { Component } from "react";
import { Button } from "@material-ui/core";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
class ViewToggler extends Component {
  state = { isVisible: false };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#041B15", width: "100%", height: "15%" }}>
        <Button onClick={this.handleClick}>
          <MenuOutlinedIcon fontSize="large" color="primary">
            {this.state.isVisible
              ? "Hide movie information"
              : "Show movie information"}
          </MenuOutlinedIcon>
        </Button>
        {this.state.isVisible && this.props.children}
      </div>
    );
  }
}

export default ViewToggler;
