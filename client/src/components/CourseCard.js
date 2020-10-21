import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  // can I get tasks from the course page?
  async getProgress() {
    const { id } = this.props.course;

    // get and store tasks
    const res = await fetch(`/courses/${id}/tasks`);
    const tasks = await res.json();

    const completedTasks = tasks.filter((task) => task.complete === 1);

    // calculate progress based on completed tasks
    const progress = (completedTasks.length / tasks.length) * 100;

    this.setState({ progress });
  }

  componentDidMount() {
    this.getProgress();
  }

  render() {
    const { course, collection } = this.props;
    const { progress } = this.state;

    return (
      <div className="card m-4">
        <div className="card-body text-left">
          <Link to={`/courses/${course.id}`}>
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-muted mb-3">{collection?.name}</h6>
          <div className="text-right mb-2">
            <a href={course?.url} target="_blank" className="card-link">
              Go to course<i className="fas fa-external-link-alt ml-2"></i>
            </a>
          </div>

          <div className="progress p-0 m-0" style={{ height: "5px" }}>
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
