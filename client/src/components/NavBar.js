import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AuthButton from "./AuthButton";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="collapse navbar-collapse">
          <ul id="navbar" className="navbar-nav">
            <li className="nav-item active mr-3">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item mr-3">
              <Link className="nav-link" to="/addcourse">
                Add course
              </Link>
            </li> */}
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/discover" exact>
                Discover
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/search" exact>
                Search
              </NavLink>
            </li>
            <li className="nav-item active mr-3">
              <NavLink className="nav-link" to="/login" exact>
                Login
              </NavLink>
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
