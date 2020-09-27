import React, { Component } from "react";

// importing the bootstrap components
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Container,
} from "react-bootstrap";

// importin the Redirect component for redirecting if user not login
import { Redirect } from "react-router-dom";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      indiaOffSet: 5.5,
      londonOffSet: 1,
      usOffSet: -4,
      indiaTime: "",
      londonTime: "",
      usTime: "",
      indiaDiff: "",
      londonDiff: "",
      usSetTime: "",
      error: "",
    };
  }

  // When the component mount then the real time of all country will display
  componentDidMount() {
    const { indiaOffSet, londonOffSet, usOffSet } = this.state;
    // finding the india date and time
    var date = new Date();
    // finding the local time in miliseond
    var localTime = date.getTime();
    // finding the local offSet
    var localOffSet = date.getTimezoneOffset() * 60000;
    // findinf the utc so that calcluate the other country time
    var utc = localOffSet + localTime;
    // finding the all city time by offset
    var indiaTime = new Date(utc + 3600000 * indiaOffSet);
    var londonTime = new Date(utc + 3600000 * londonOffSet);
    var usTime = new Date(utc + 3600000 * usOffSet);
    // convert time into the showable time
    var india = indiaTime.toLocaleString().substring(12);
    var london = londonTime.toLocaleString().substring(12);
    var us = usTime.toLocaleString().substring(12);

    // updating the state
    this.setState({
      indiaTime: india,
      londonTime: london,
      usTime: us,
      indiaDiff: "+10",
      londonDiff: "+5",
    });
    // update funciton call every after 5 second
    setInterval(() => {
      this.afterFiveSecond();
    }, 5000);
  }

  // this function will call after every five second and update the time
  afterFiveSecond = () => {
    const { usTime, indiaTime, londonTime } = this.state;
    var india = indiaTime.split(":");
    var london = londonTime.split(":");
    var us = usTime.split(":");
    var second = 0;
    var minute = 0;
    var addInhour = 0;
    var usHour = 0;
    var indiaHour = 0;
    var londonHour = 0;
    // var hour = 0;
    if (parseInt(us[2]) >= 55) {
      second = (parseInt(us[2]) + 5) % 60;
      if (parseInt(us[1]) >= 59) {
        minute = (parseInt(us[1]) + 1) % 60;
        addInhour = 1;
      } else {
        minute = parseInt(us[1]) + 1;
      }
    } else {
      second = parseInt(us[2]) + 5;
      minute = parseInt(us[1]);
    }
    if (addInhour === 1) {
      if (parseInt(us[0]) >= 23) {
        usHour = 0;
      } else {
        usHour = parseInt(us[0] + 1);
      }
      if (parseInt(india[0]) >= 23) {
        indiaHour = 0;
      } else {
        indiaHour = parseInt(india[0] + 1);
      }
      if (parseInt(london[0]) >= 23) {
        londonHour = 0;
      } else {
        londonHour = parseInt(london[0] + 1);
      }
    } else {
      indiaHour = india[0];
      londonHour = london[0];
      usHour = us[0];
    }
    var finalUsTime = usHour + ":" + minute + ":" + second;
    var finalIndiaTime = indiaHour + ":" + minute + ":" + second;
    var finalLondonTime = londonHour + ":" + minute + ":" + second;

    this.setState({
      usTime: finalUsTime,
      indiaTime: finalIndiaTime,
      londonTime: finalLondonTime,
    });
  };

  // for message error
  componentDidUpdate() {
    if (this.state.error != 0) {
      this.state.error = "";
    }
  }

  // if user give any input it handle it
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

  // handle the time if user give the time
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
  };

  // handle the london diff if user give the diff
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

  //  handle the india diff if user give the diff
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
