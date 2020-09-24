import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Container,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      indiaTime: new Date().toTimeString().substring(0, 8),
      londonTime: "",
      usTime: "",
    };
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="my-5">
        <InputGroup className="mb-3">
          <Row sm={12} className="ml-5 mb-3">
            <InputGroup.Prepend className="ml-5">
              <InputGroup.Text>Set United State Time : </InputGroup.Text>
            </InputGroup.Prepend>
          </Row>
          <Row sm={12} className="ml-5 mb-3">
            <FormControl placeholder="12:45:55" className="ml-5" />
          </Row>
          <Row sm={12} className="ml-5 mb-3">
            <Button className="ml-5" variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </InputGroup>
        <Container className="my-5">
          <Row>
            <Col xs={12} md={4}>
              United State : <span>16:34:56</span>
            </Col>
            <Col xs={12} md={4}>
              London : <span>16:34:56</span>
            </Col>
            <Col xs={12} md={4}>
              India : <span>16:34:56</span>
            </Col>
          </Row>
        </Container>
        <Container>
          <hr className="my-5 border border-dark" md={10} />
        </Container>
        <Container className="my-5">
          <Row>
            Time Difference For London
            <Col xs={12} md={2}>
              <FormControl className="mb-3" placeholder="-55" />
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
            Time Difference For India
            <Col xs={12} md={2}>
              <FormControl placeholder="-55" className="mb-3" />
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
