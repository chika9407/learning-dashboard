import React, { Component } from "react";

export default class AddCourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      collection: null,
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addCourse = () => {};

  render() {
    return (
      <form className="form-inline justify-content-center">
        <input
          className="form-control"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
          placeholder="Course title"
        />
        <input
          className="form-control"
          name="url"
          value={this.state.url}
          onChange={this.handleInput}
          placeholder="Course url"
        />
        <input
          type="number"
          className="form-control"
          name="collection"
          value={this.state.collection}
          onChange={this.handleInput}
          min="1"
          max="3"
        ></input>
        <button className="btn btn-outline-dark" onClick={this.addCourse}>
          Add
        </button>
      </form>
    );
  }
}
