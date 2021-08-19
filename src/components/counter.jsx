import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    // to use the state.value = this.props.value
    super(props);
  }

  render() {
    let classes = this.getBadgeClasses();
    return (
      <div className="row">
        {/* To render the children  */}
        {/* {this.props.children} */}
        <div className="col">
          <span className={classes}>{this.formatCount()}</span>
        </div>
        {/* <img src={this.state.imageUrl}></img> */}
        <div className="col">
          <button
            onClick={this.props.onIncrement}
            className="btn btn-secondary btn-sm"
          >
            +
          </button>
        </div>
        <div className="col">
          <button
            onClick={this.props.onDecrement}
            className="btn btn-warning btn-sm"
          >
            -
          </button>
        </div>
        <div className="col">
          <button
            onClick={this.props.onDelete}
            className="btn btn-danger btn-sm"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.props;
    return count === 0 ? "ZERO" : count;
  }
}

export default Counter;
