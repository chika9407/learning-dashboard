import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default class CourseCard extends Component {
  render() {
    const { course, category } = this.props;

    return (
      <div className="card m-4 shadow border-0">
        <div className="card-body p-3 text-left position-relative">
          <small className="card-subtitle text-muted text-capitalize d-block mt-2">
            {category?.name}
          </small>
          <Link to={`/courses/${course.id}`}>
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-capitalize text-muted mb-1">
            {course.platform}
          </h6>

          <a
            href={course?.url}
            target="_blank"
            id="start-course"
            className="card-link d-block text-primary"
          >
            Go to course<i className="fas fa-external-link-alt mx-2 mb-2"></i>
          </a>

          <div className="progress" style={{ height: "15px" }}>
            <div
              className="progress-bar"
              style={{ width: `${course.progress}%` }}
            >
              {Math.round(course.progress)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}
