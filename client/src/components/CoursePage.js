import React, { Component } from "react";
import api from "../services/api.js";

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      tasks: [],
      task: "",
    };
  }

  async componentDidMount() {
    // get course id from url parameter
    const { id } = this.props.match.params;

    const course = await api.getCourse(id);
    this.setState({ course });

    this.getTasks();
  }

  //   getCourse = () => {
  //     // get course id from url parameter
  //     const { id } = this.props.match.params;

  //     fetch(`/courses/${id}`)
  //       .then((res) => res.json())
  //       .then((course) => this.setState({ course }))
  //       .catch((error) => console.log(error));
  //   };

  deleteCourse(id) {
    fetch(`/courses/${id}`, {
      method: "DELETE",
    })
      .then(() => this.props.history.push("/"))
      .catch((error) => {
        console.log(error);
      });
  }

  getTasks = () => {
    // get course id from url parameter
    const { id } = this.props.match.params;

    fetch(`/courses/${id}/tasks`)
      .then((res) => res.json())
      .then((tasks) => this.setState({ tasks, task: "" }))
      .catch((error) => console.log(error));
  };

  updateTask(id, complete) {
    fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: !complete }),
    })
      .then(this.getTasks)
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.getTasks)
      .catch((error) => {
        console.log(error);
      });
  }

  handleInput = (e) => {
    const task = e.target.value;
    this.setState({ task });
  };

  addTask(e) {
    e.preventDefault();

    // get course id from url parameter
    const { id } = this.props.match.params;

    fetch(`/courses/${id}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.task }),
    })
      .then(this.getTasks)
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { tasks, course } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center border-bottom mb-3 p-3">
          <h2 className="mr-5 pl-5">{course.title}</h2>
          <a className="btn" onClick={() => this.deleteCourse(course.id)}>
            <i className="fas fa-trash-alt"></i>
          </a>
          <a href={course.url} target="_blank" className="btn">
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>

        <ul className="list-group my-4 d-inline-block">
          {tasks.map((task, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center p-1"
              key={i}
            >
              <span className={task.complete && "done"}>
                <button
                  className="btn p-0 mx-2"
                  onClick={() => this.updateTask(task.id, task.complete)}
                >
                  {!task.complete ? (
                    <i className="far fa-square"></i>
                  ) : (
                    <i className="far fa-check-square"></i>
                  )}
                </button>
                {task.name}
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
        <form className="form-inline justify-content-center">
          <input
            value={this.state.task}
            placeholder="New task..."
            className="form-control"
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
