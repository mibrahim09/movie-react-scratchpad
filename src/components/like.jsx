import React, { Component } from "react";
class Like extends Component {
  render() {
    const liked = this.props.liked;
    if (liked === false)
      return (
        <i
          class="fa fa-heart-o"
          onClick={this.props.onLike}
          aria-hidden="true"
        ></i>
      );
    else
      return (
        <i
          class="fa fa-heart"
          onClick={this.props.onDislike}
          aria-hidden="true"
        ></i>
      );
  }
}
export default Like;
