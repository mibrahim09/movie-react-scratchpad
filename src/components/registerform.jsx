import React, { Component } from "react";
import Form from "./form";
import Joi from "joi";
class RegisterForm extends Form {
  //   username = React.createRef();
  //   password = React.createRef();
  state = {
    data: { username: "", password: "", name: "" },
    errors: [],
  };

  schema = Joi.object({
    username: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .max(20)
      .min(4)
      .label("Username"), // label is the name to be shown to the user.
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  });

  doSubmit = () => {
    // Call the server and redirect the user to another page.
    console.log(
      `Username: ${this.state.data.username}-- Password: ${this.state.data.password} -- Name: ${this.state.data.name}`
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderBtn("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
