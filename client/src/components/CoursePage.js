import React, { Component } from "react";
import api from "../services/api.js";

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      tasks: [],
      text: "",
      selectedStatus: "",
    };
  }

  async componentDidMount() {
    // get course id from url parameter
    const { course_id } = this.props.match.params;

    try {
      const course = await api.getCourse(course_id);
      const tasks = await api.getTasks(course_id);
      this.setState({ course, tasks, selectedStatus: course.status });
    } catch (error) {
      console.log(error);
    }
  }

  handleInput = (e) => {
    this.setState({ text: e.target.value });
  };

  handleOptionChange = (e) => {
    this.setState({ selectedStatus: e.target.value });

    console.log(e.target.value);

    // get course id from url parameter
    const { course_id } = this.props.match.params;

    // Update the status in the database
    this.updateCourseStatus(course_id, e.target.value);
  };

  // Update course status
  async updateCourseStatus(course_id, status) {
    try {
      await api.updateCourseStatus(course_id, status);
      const course = await api.getCourse(course_id);
      this.setState({ course });
    } catch (error) {
      console.log(error);
    }
  }

  // Delete course
  async deleteCourse(course_id) {
    try {
      await api.deleteCourse(course_id);
    } catch (error) {
      console.log(error);
    }
    // navigate back to home page
    this.props.history.push("/");
  }

  async handleCompleteTask(task_id, complete) {
    // get course id from url parameter
    const { course_id } = this.props.match.params;

    try {
      await api.updateTask(task_id, complete);
      const tasks = await api.getTasks(course_id);
      this.setState({ tasks });

      // calculate progress based on completed tasks
      const completedTasks = tasks.filter((task) => task.complete === 1);
      const progress = (completedTasks.length / tasks.length) * 100;
      await api.updateCourseProgress(course_id, progress);

      // fetch course info again
      const course = await api.getCourse(course_id);
      this.setState({ course });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(task_id) {
    // get course id from url parameter
    const { course_id } = this.props.match.params;

    try {
      await api.deleteTask(task_id);
      const tasks = await api.getTasks(course_id);
      this.setState({ tasks });
    } catch (error) {
      console.log(error);
    }
  }

  async addTask(e) {
    e.preventDefault();

    // get course id from url parameter
    const { course_id } = this.props.match.params;

    await api.addTask(course_id, this.state.text);

    const tasks = await api.getTasks(course_id);
    this.setState({ tasks, text: "" });

    // update progress
    const completedTasks = tasks.filter((task) => task.complete === 1);
    const progress = (completedTasks.length / tasks.length) * 100;
    await api.updateCourseProgress(course_id, progress);
  }

  render() {
    const { tasks, course, selectedStatus } = this.state;

    return (
      <div className="mt-5 text-center" id="course-page">
        <div className="mb-3 p-3">
          <h5 className="text-capitalize text-secondary">{course.platform}</h5>

          <a href={course.url} target="_blank" className="d-block text-dark">
            <h2>{course.title}</h2>
          </a>

          <div
            className="btn-group btn-group-toggle mt-3 mr-3"
            data-toggle="buttons"
          >
            <label
              className={
                selectedStatus === "on hold"
                  ? "btn btn-success"
                  : "btn btn-outline-secondary"
              }
            >
              <input
                type="radio"
                name="status"
                value="on hold"
                checked={selectedStatus === "on hold"}
                onClick={this.handleOptionChange}
              />
              On Hold
            </label>
            <label
              className={
                selectedStatus === "in progress"
                  ? "btn btn-success"
                  : "btn btn-outline-secondary"
              }
            >
              <input
                type="radio"
                name="status"
                value="in progress"
                checked={selectedStatus === "in progress"}
                onClick={this.handleOptionChange}
              />
              In Progress
            </label>
            <label
              className={
                selectedStatus === "completed"
                  ? "btn btn-success"
                  : "btn btn-outline-secondary"
              }
            >
              <input
                type="radio"
                name="status"
                value="completed"
                checked={selectedStatus === "completed"}
                onClick={this.handleOptionChange}
              />
              Completed
            </label>
          </div>
        </div>
        <hr className="w-50" />
        <h4 className="mt-4">To Do List</h4>
        <ul className="list-group w-25 mt-2 mb-4 mx-auto">
          {tasks.map((task, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center p-1"
              key={i}
            >
              <span className={task.complete && "done"}>
                <button
                  className="btn p-0 mx-2"
                  onClick={() =>
                    this.handleCompleteTask(task.id, task.complete)
                  }
                >
                  {!task.complete ? (
                    <i className="far fa-square"></i>
                  ) : (
                    <i className="far fa-check-square"></i>
                  )}
                </button>
                {task.text}
              </span>

              <button
                className="btn ml-4 text-secondary"
                onClick={() => this.deleteTask(task.id)}
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
        <form className="form-inline justify-content-center mb-5">
          <input
            value={this.state.text}
            placeholder="New task..."
            className="form-control mr-2"
            onChange={(e) => this.handleInput(e)}
          />
          <button
            className="btn btn-outline-dark"
            onClick={(e) => this.addTask(e)}
          >
            Add
          </button>
        </form>
        <hr className="w-50" />
        <a
          className="btn btn-outline-danger mr-3"
          onClick={() => this.deleteCourse(course.id)}
        >
          Delete course {/* <i className="fas fa-trash-alt"></i> */}
        </a>
      </div>
    );
  }
}
