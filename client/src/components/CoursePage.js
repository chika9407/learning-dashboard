import React, { Component } from "react";
import api from "../services/api.js";

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      tasks: [],
      text: "",
    };
  }

  async componentDidMount() {
    // get course id from url parameter
    const { id } = this.props.match.params;

    try {
      const course = await api.getCourse(id);
      const tasks = await api.getTasks(id);
      this.setState({ course, tasks });
    } catch (error) {
      console.log(error);
    }
  }

  handleInput = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

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

  // Activate course
  // async updateCourse() {

  // }

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
    const { tasks, course } = this.state;
    return (
      <div>
        <div className="border-bottom mb-3 p-3">
          <h2 className="mr-5 pl-5 mb-4">{course.title}</h2>
          <div className="d-flex justify-content-center">
            <div class="btn-group btn-group-toggle mr-3" data-toggle="buttons">
              <label class="btn btn-success active">
                <input type="radio" name="options" id="option1" checked />
                Active
              </label>
              <label class="btn btn-secondary">
                <input type="radio" name="options" id="option2" /> Inactive
              </label>
              <label class="btn btn-secondary">
                <input type="radio" name="options" id="option3" /> Completed
              </label>
            </div>
            {/* <div class="btn-group-toggle mr-3" data-toggle="buttons">
              <label class="btn btn-success active">
                <input type="checkbox" checked /> Active
              </label>
            </div> */}

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
        <form className="form-inline justify-content-center">
          <input
            value={this.state.text}
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
