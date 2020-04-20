import React, { Component } from "react";

class ViewTogglerInfo extends Component {
  state = { isVisible: true };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };
  render() {
    return (
      <>
        <button onClick={this.handleClick}>
          {this.state.isVisible ? "Hide movie info" : "Show movie info"}
        </button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerInfo;
