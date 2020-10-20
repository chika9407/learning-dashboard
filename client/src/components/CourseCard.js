import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import CoursePage from "./CoursePage";
import "./CourseCard.css";

export default class CourseCard extends Component {
  render() {
    const { course, collection } = this.props;

    return (
      <div className="card m-4">
        <div className="card-body text-left">
          <Link to="/courses/1">
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-muted mb-3">{collection?.name}</h6>

          <a
            href={course?.url}
            target="_blank"
            className="card-link align-bottom"
          >
            Go to course
          </a>
        </div>
      </div>
    );
  }
}
