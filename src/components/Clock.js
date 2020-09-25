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
      indiaOffSet: 5.5,
      londonOffSet: 1,
      usOffSet: -4,
      indiaTime: "", //new Date().toTimeString().substring(0, 8),
      londonTime: "",
      usTime: "",
      indiaDiff: "",
      londonDiff: "",
      usSetTime: "",
      error: "",
    };
  }

  componentDidMount() {
    const { indiaOffSet, londonOffSet, usOffSet } = this.state;
    var date = new Date();
    // console.log("Date", date);
    var localTime = date.getTime();
    // console.log("LocalTIme", localTime);
    var localOffSet = date.getTimezoneOffset() * 60000;
    // console.log("LocalOFFSet", localOffSet);
    var utc = localOffSet + localTime;
    // console.log("UTC", utc);
    var indiaTime = new Date(utc + 3600000 * indiaOffSet);
    var londonTime = new Date(utc + 3600000 * londonOffSet);
    var usTime = new Date(utc + 3600000 * usOffSet);
    var india = indiaTime.toLocaleString().substring(12);
    var london = londonTime.toLocaleString().substring(12);
    var us = usTime.toLocaleString().substring(12);
    this.setState({
      indiaTime: india,
      londonTime: london,
      usTime: us,
      indiaDiff: "+10",
      londonDiff: "+5",
    });
  }

  componentDidUpdate() {
    if (this.state.error != 0) {
      this.state.error = "";
    }
  }

  handleChange = (name, value) => {
    // console.log(name, value);
    if (name === "usSetTime") {
      this.setState({ usSetTime: value });
    } else if (name === "londonDiff") {
      this.setState({ londonDiff: value });
    } else if (name === "indiaDiff") {
      this.setState({ indiaDiff: value });
    }
  };

  handleUsTime = () => {
    const { usSetTime } = this.state;
    if (usSetTime.length === 0) {
      return;
    }
    var arr = usSetTime.split(":");
    if (
      parseInt(arr[0]) > 23 ||
      parseInt(arr[1]) > 59 ||
      parseInt(arr[2]) > 59
    ) {
      this.setState({
        error: "InVaild Time Format",
      });
      return;
    }
    var india, london;
    if (parseInt(arr[0]) <= 14) {
      india = parseInt(arr[0]) + 9 + ":" + arr[1] + ":" + arr[2];
      london = parseInt(arr[0]) + 5 + ":" + arr[1] + ":" + arr[2];
    } else {
      if (parseInt(arr[0]) < 18) {
        var hour = parseInt(arr[0] + 9);
        india = (hour % 24) + ":" + arr[1] + ":" + arr[2];
        london = parseInt(arr[0]) + 5 + ":" + arr[1] + ":" + arr[2];
      } else {
        var hour = parseInt(arr[0]);
        india = ((hour + 9) % 24) + ":" + arr[1] + ":" + arr[2];
        london = ((hour + 5) % 24) + ":" + arr[1] + ":" + arr[2];
      }
    }
    this.setState({
      indiaTime: india,
      londonTime: london,
      usTime: usSetTime,
      indiaDiff: "+9",
      londonDiff: "+5",
    });

    // console.log(india, london);
  };

  handleLondonDiff = () => {
    const { londonDiff, usTime } = this.state;
    if (parseInt(londonDiff) > 23 || parseInt(londonDiff) < -23) {
      this.state.error = "";
      this.setState({
        error: "Difference Format is Wrong",
      });
      return;
    }
    var us = usTime.split(":");
    var london = parseInt(us[0]) + parseInt(londonDiff);
    // console.log(london);
    var londonNewTime;
    if (london < 0) {
      londonNewTime = ((24 + london) % 24) + ":" + us[1] + ":" + us[2];
    } else {
      londonNewTime = (london % 24) + ":" + us[1] + ":" + us[2];
    }
    this.setState({
      londonTime: londonNewTime,
    });
  };

  handleIndiaDiff = () => {
    const { indiaDiff, usTime } = this.state;
    if (parseInt(indiaDiff) > 23 || parseInt(indiaDiff) < -23) {
      this.state.error = "";
      this.setState({
        error: "Difference Format is Wrong",
      });
      return;
    }
    var us = usTime.split(":");
    var india = parseInt(us[0]) + parseInt(indiaDiff);
    // console.log(london);
    var indiaNewTime;
    if (india < 0) {
      indiaNewTime = ((24 + india) % 24) + ":" + us[1] + ":" + us[2];
    } else {
      indiaNewTime = (india % 24) + ":" + us[1] + ":" + us[2];
    }
    this.setState({
      indiaTime: indiaNewTime,
    });
  };

  render() {
    const { isLoggedIn } = this.props;
    const {
      indiaTime,
      londonTime,
      usTime,
      indiaDiff,
      londonDiff,
      error,
    } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="my-5">
        {error && <h1>{error}</h1>}
        <InputGroup className="mb-3">
          <Row sm={12} className="ml-5 mb-3">
            <InputGroup.Prepend className="ml-5">
              <InputGroup.Text>Set United State Time : </InputGroup.Text>
            </InputGroup.Prepend>
          </Row>
          <Row sm={12} className="ml-5 mb-3">
            <FormControl
              onChange={(e) => this.handleChange("usSetTime", e.target.value)}
              placeholder="12:45:55"
              className="ml-5"
            />
          </Row>
          <Row sm={12} className="ml-5 mb-3">
            <Button
              className="ml-5"
              variant="primary"
              onClick={this.handleUsTime}
            >
              Submit
            </Button>
          </Row>
        </InputGroup>
        <Container className="my-5">
          <Row>
            <Col xs={12} md={4}>
              United State : <span style={{ fontSize: 40 }}>{usTime}</span>
            </Col>
            <Col xs={12} md={4} className="my-4">
              London : <span>{londonTime}</span>
            </Col>
            <Col xs={12} md={4} className="my-4">
              India : <span>{indiaTime}</span>
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
              <FormControl
                className="mb-3"
                placeholder="-55"
                value={londonDiff}
                onChange={(e) =>
                  this.handleChange("londonDiff", e.target.value)
                }
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={this.handleLondonDiff}>
                Submit
              </Button>
            </Col>
            Time Difference For India
            <Col xs={12} md={2}>
              <FormControl
                placeholder="-55"
                className="mb-3"
                value={indiaDiff}
                onChange={(e) => this.handleChange("indiaDiff", e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={this.handleIndiaDiff}>
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
