import React, { Component } from "react";
import "./CourseCard.css";

export default class CourseCard extends Component {
  render() {
    const { course } = this.props;
    return (
      <div className="card m-4">
        <div className="card-body text-left">
          <h5 className="card-title">{course.title}</h5>
          {/* <h6 className="card-subtitle text-muted">{collection.name}</h6> */}
        </div>
      </div>
    );
  }
}
