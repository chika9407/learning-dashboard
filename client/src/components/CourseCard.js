import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default class CourseCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { tasks: [] };
  // }

  // getProgress = async () => {
  //   const { id } = this.props.course;

  //   console.log(id);

  //   const tasks = await api.getTasks(id);

  //   console.log("tasks", tasks);

  //   const completedTasks = tasks.filter((task) => task.complete === 1);

  //   let progress = 0;

  //   if (tasks.length && completedTasks.length) {
  //     // calculate progress based on completed tasks
  //     progress = (completedTasks.length / tasks.length) * 100;
  //   }
  //   this.setState({ progress });

  //   console.log("in function", progress);
  // };

  // async componentDidMount() {
  //   const { id } = this.props.course;
  //   const tasks = await api.getTasks(id);
  //   this.setState({ tasks });

  //   // this.getProgress();
  // }

  // async componentDidUpdate() {
  //   const { id } = this.props.course;
  //   const tasks = await api.getTasks(id);
  //   this.setState({ tasks });

  //   // this.getProgress();
  // }

  render() {
    const { course, category } = this.props;
    // const { tasks } = this.state;
    // const completedTasks = tasks.filter((task) => task.complete === 1);

    // console.log(
    //   course.title,
    //   "id = ",
    //   course.id,
    //   ": ",
    //   tasks,
    //   "completed: ",
    //   completedTasks
    // );

    // const progress =
    //   tasks.length && completedTasks.length
    //     ? (completedTasks.length / tasks.length) * 100
    //     : 0;

    // console.log("in render", progress);

    // let statusClassName = "border px-1 rounded d-inline-block ";
    let statusClassName = "badge px-1 d-inline-block ";

    // determine color of status label
    switch (course.status) {
      case "completed":
        statusClassName += "badge-success";
        break;
      case "in progress":
        statusClassName += "badge-primary";
        break;
      default:
        statusClassName += "badge-secondary";
    }

    return (
      <div className="card m-4 position-relative">
        <div className="card-body pt-2 pr-2 text-left">
          <small className="card-subtitle text-muted text-capitalize mt-2 d-block">
            {category?.name}
          </small>
          <Link to={`/courses/${course.id}`}>
            <h5 className="card-title">{course?.title}</h5>
          </Link>
          <h6 className="card-subtitle text-capitalize text-muted mb-1">
            {course.platform}
          </h6>
          <span className={statusClassName}>{course?.status}</span>

          <div className="footer text-right position-absolute ">
            <a href={course?.url} target="_blank" className="card-link">
              Start course<i className="fas fa-external-link-alt mx-2 mb-2"></i>
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
      </div>
    );
  }
}
