import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Container md="auto">
          <Navbar.Brand href="#">World Clock</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}
