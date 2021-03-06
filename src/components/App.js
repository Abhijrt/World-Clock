import React from "react";
import Login from "./Login";
import NavBar from "./NavBar";
import Clock from "./Clock";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isLoggedInId: "",
      india: "",
      london: "",
      us: "",
      error: "",
      // giving the by default user
      users: [
        {
          id: 0,
          username: "abhay",
          password: "123",
        },
        {
          id: 1,
          username: "jirati",
          password: "1",
        },
      ],
    };
  }

  // hanlde the logout
  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  // authentication user if password and username match
  onLoginButtonClick = (username, password) => {
    const { users } = this.state;
    users.map((user) => {
      // console.log(user.id);
      if (user.username === username && user.password === password) {
        this.setState({
          isLoggedIn: true,
          isLoggedInId: user.id,
        });
      }
    });
    this.setState({ error: "Invalid User Name or Password" });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <Login
                    onLoginButtonClick={this.onLoginButtonClick}
                    isLoggedIn={this.state.isLoggedIn}
                    error={this.state.error}
                  />
                );
              }}
            />
            <Route
              path="/clock"
              render={() => {
                return <Clock isLoggedIn={this.state.isLoggedIn} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
