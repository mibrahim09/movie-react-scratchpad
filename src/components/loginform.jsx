import React, { Component } from "react";
import Form from "./form";
import Joi from "joi";

class LoginForm extends Form {
  //   username = React.createRef();
  //   password = React.createRef();
  state = {
    data: { username: "", password: "" },
    errors: [],
  };

  schema = Joi.object({
    username: Joi.string().required().max(20).min(4).label("Username"), // label is the name to be shown to the user.
    password: Joi.string().required().label("Password"),
  });

  doSubmit = () => {
    // Call the server and redirect the user to another page.
    console.log(
      `Username: ${this.state.data.username}-- Password: ${this.state.data.password}`
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderBtn("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
