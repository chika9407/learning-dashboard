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
    const { id } = this.props.match.params;

    try {
      const course = await api.getCourse(id);
      const tasks = await api.getTasks(id);
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

    // Update the status in the database
    this.updateCourse(this.state.course.id, e.target.value);
  };

  // Update course status
  async updateCourse(id, status) {
    try {
      await api.updateCourse(id, status);
      const course = await api.getCourse(id);
      this.setState({ course });
    } catch (error) {
      console.log(error);
    }
  }

  // Delete course
  async deleteCourse(id) {
    try {
      await api.deleteCourse(id);
    } catch (error) {
      console.log(error);
    }
    // navigate back to home page
    this.props.history.push("/");
  }

  async handleCompleteTask(id, complete) {
    // get course id from url parameter
    const course_id = this.props.match.params.id;

    try {
      await api.updateTask(id, complete);
      const tasks = await api.getTasks(course_id);
      this.setState({ tasks });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(id) {
    // get course id from url parameter
    const course_id = this.props.match.params.id;

    try {
      await api.deleteTask(id);
      const tasks = await api.getTasks(course_id);
      this.setState({ tasks });
    } catch (error) {
      console.log(error);
    }
  }

  async addTask(e) {
    e.preventDefault();

    // get course id from url parameter
    const { id } = this.props.match.params;

    await api.addTask(id, this.state.text);

    const tasks = await api.getTasks(id);
    this.setState({ tasks, text: "" });
  }

  render() {
    const { tasks, course, selectedStatus } = this.state;

    return (
      <div className="mt-5 text-left ml-5">
        <div className="border-bottom mb-3 p-3">
          <h5 className="text-capitalize">{course.platform}</h5>
          <h2 className="mb-4">{course.title}</h2>

          <div className="d-flex mb-3">
            <div
              className="btn-group btn-group-toggle mr-3"
              data-toggle="buttons"
            >
              <label
                className={
                  selectedStatus === "in progress"
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
              >
                <input
                  type="radio"
                  name="status"
                  value="in progress"
                  checked={selectedStatus === "in progress"}
                  onChange={this.handleOptionChange}
                />
                in progress
              </label>
              <label
                className={
                  selectedStatus === "on hold"
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
              >
                <input
                  type="radio"
                  name="status"
                  value="on hold"
                  checked={selectedStatus === "on hold"}
                  onChange={this.handleOptionChange}
                />
                on hold
              </label>
              <label
                className={
                  selectedStatus === "completed"
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
              >
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  checked={selectedStatus === "completed"}
                  onChange={this.handleOptionChange}
                />
                completed
              </label>
            </div>
          </div>
          <a
            className="btn btn-danger mr-3"
            onClick={() => this.deleteCourse(course.id)}
          >
            Delete course {/* <i className="fas fa-trash-alt"></i> */}
          </a>
          <a href={course.url} target="_blank" className="btn btn-primary">
            Go to course <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
        <h5 className="mt-4">To Do List</h5>
        <ul className="list-group w-25 mt-2 mb-4">
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
                className="btn ml-4"
                onClick={() => this.deleteTask(task.id)}
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
        <form className="form-inline ">
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
      </div>
    );
  }
}
