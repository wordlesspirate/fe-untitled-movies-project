import React, { Component } from 'react';

class ViewTogglerDirections extends Component {
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
          {this.state.isVisible
            ? 'Hide text directions'
            : 'Show text directions'}
        </button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerDirections;
