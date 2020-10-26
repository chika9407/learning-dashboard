import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="collapse navbar-collapse">
          <ul id="navbar" className="navbar-nav">
            <li className="nav-item active mr-3">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item mr-3">
              <Link className="nav-link" to="/addcourse">
                Add course
              </Link>
            </li> */}
            <li className="nav-item mr-3">
              <Link className="nav-link" to="/discover">
                Discover
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
