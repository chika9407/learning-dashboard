import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div className="position-fixed" id="sidebar">
        <nav class="nav flex-column">
          <Link class="nav-link active" href="#">
            Active
          </Link>
          <Link class="nav-link" href="#">
            Link
          </Link>
          <Link class="nav-link" href="#">
            Link
          </Link>
          <Link class="nav-link disabled" href="#">
            Disabled
          </Link>
        </nav>
      </div>
    );
  }
}
