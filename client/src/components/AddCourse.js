import React, { Component } from "react";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      collection: 0,
    };
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newCourse = {
  //     title: this.state.title,
  //     url: this.state.url,
  //     collection: this.state.collection,
  //   };

  //   this.props.addCourse(newCourse);
  // };

  addCourse = (e) => {
    e.preventDefault();

    const newCourse = {
      title: this.state.title,
      url: this.state.url,
      collection: this.state.collection,
    };

    fetch(`/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then(() => console.log("Course added"))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Add a new course</h2>
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
      </div>
    );
  }
}
