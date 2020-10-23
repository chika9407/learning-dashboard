import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import "./CourseCard.css";

export default class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  // can I get tasks from the course page?
  async getProgress() {
    const { id } = this.props.course;

    // // get and store tasks
    // const res = await fetch(`/courses/${id}/tasks`);
    // const tasks = await res.json();

    const tasks = await api.getTasks(id);

    const completedTasks = tasks.filter((task) => task.complete === 1);

    // calculate progress based on completed tasks
    const progress = (completedTasks.length / tasks.length) * 100;

    this.setState({ progress });
  }

  componentDidMount() {
    this.getProgress();
  }

  render() {
    const { course, category } = this.props;
    const { progress } = this.state;

    let statusClassName = "border px-1 rounded d-inline-block ";

    // determine color of status label
    switch (course.status) {
      case "completed":
        statusClassName += "text-success border-success";
        break;
      case "active":
        statusClassName += "text-warning border-warning";
        break;
      default:
        statusClassName += "text-secondary border-secondary";
    }

    return (
      <div className="card m-4 position-relative">
        <div className="card-body pt-3 text-left">
          <small className="card-subtitle text-muted text-capitalize mb-3">
            {category?.name}
          </small>
          <Link to={`/courses/${course.id}`}>
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-capitalize text-muted mb-1">
            {course.platform}
          </h6>
          <small className={statusClassName}>{course?.status}</small>

          <div className="footer text-right position-absolute ">
            <a href={course?.url} target="_blank" className="card-link">
              Go to course<i className="fas fa-external-link-alt mx-2 mb-2"></i>
            </a>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
