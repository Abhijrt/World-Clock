import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (name, value) => {
    if (name === "username") {
      this.setState({ username: value });
    } else {
      this.setState({ password: value });
    }
  };

  handleLoginButtonClick = () => {
    const { username, password } = this.state;
    // console.log(username, password);
    this.props.onLoginButtonClick(username, password);
  };

  render() {
    const { isLoggedIn, error } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/clock" />;
    }
    return (
      <Form className="my-5">
        {error && <h1>{error}</h1>}
        <Col sm={3} className="my-3 text-center">
          <h1>Login Form</h1>
        </Col>

        <Form.Group controlId="formBasicEmail">
          <Col sm={3} className="my-1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              onChange={(e) => this.handleChange("username", e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Col sm={3} className="my-1">
            <Form.Label>Password</Form.Label>s
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleChange("userName", e.target.value)}
            />
          </Col>
        </Form.Group>
        <Col sm={3} className="my-1 ">
          <Button variant="primary" onClick={this.handleLoginButtonClick}>
            Submit
          </Button>
        </Col>
      </Form>
    );
  }
}
