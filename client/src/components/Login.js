import React from "react";
//import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test",
      password: "test",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = () => {};

  requestData = () => {};

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            type="text"
            className="form-control mb-2"
          />
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          <button className=" btn btn-primary" onClick={this.login}>
            Log in
          </button>
        </div>
        <div className="text-center p-4">
          <button
            className=" btn btn-outline-primary"
            onClick={this.requestData}
          >
            Request protected data
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
