import React, { Component } from "react";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      collection: undefined,
    };
  }

  handleInput = (e) => {
    // Handle input from select
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleInputUrl = (e) => {
    const url = e.target.value;

    const parsedUrl = url.split("/");

    // Get last part of url that contains the course title
    const titleFromUrl =
      parsedUrl[parsedUrl.length - 1] === "/"
        ? parsedUrl[parsedUrl.length - 2]
        : parsedUrl[parsedUrl.length - 2];

    // Format title to prefill title input
    const title = titleFromUrl
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

    this.setState({ url, title });
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
    const { collections } = this.props;
    return (
      <div>
        <h2>Add a new course</h2>
        <form className="d-inline-block">
          <input
            className="form-control mb-2"
            name="url"
            value={this.state.url}
            onChange={this.handleInputUrl}
            placeholder="Course url"
          />
          <input
            className="form-control mb-2"
            name="title"
            value={this.state.title}
            onChange={this.handleInput}
            placeholder="Course title"
          />

          <div className="form-group">
            <select
              className="form-control"
              id="collection"
              name="collection"
              value={this.state.collection}
              onChange={this.handleInput}
            >
              <option>Choose collection</option>
              {collections.map((collection, i) => (
                <option key={i}>{collection.name}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-outline-dark mt-2"
            onClick={this.addCourse}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
