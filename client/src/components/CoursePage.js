import React, { Component } from "react";

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      tasks: [],
    };
  }

  getCourse = () => {
    const { id } = this.props.match.params;

    fetch(`/courses/${id}`)
      .then((res) => res.json())
      .then((course) => this.setState({ course }))
      .catch((error) => console.log(error));
  };

  getTasks = () => {
    const { id } = this.props.match.params;

    fetch(`/courses/${id}/tasks`)
      .then((res) => res.json())
      .then((tasks) => this.setState({ tasks }))
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

  componentDidMount() {
    this.getCourse();
    this.getTasks();
  }

  render() {
    const { tasks, course } = this.state;
    return (
      <div>
        <h2 className="mb-3">{course.title}</h2>
        <h3>To Do</h3>
        <ul className="list-group">
          {tasks.map((task, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={i}
            >
              <span className={task.complete && "done"}>
                <button
                  className="btn p-0 ml-5 mr-2"
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

              <button className="btn" onClick={() => this.deleteTask(task.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
