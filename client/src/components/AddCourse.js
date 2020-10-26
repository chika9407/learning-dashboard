import React, { Component } from "react";
import api from "../services/api.js";

export default class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      platform: "",
      category: "",
      categories: [],
      showAlert: false,
    };
  }

  async componentDidMount() {
    const categories = await api.getCategories();

    this.setState({ categories });
  }

  handleInput = (e) => {
    // Handle input from select
    const { name, value } = e.target;

    // If a url is given, handle parsing to prefill title and platform
    if (name === "url" && value) {
      const parsedUrl = value.split("/");

      console.log(parsedUrl);

      // Get last part of url that contains the course title (before last if url ends with /)
      const titleFromUrl = parsedUrl[parsedUrl.length - 1]
        ? parsedUrl[parsedUrl.length - 1]
        : parsedUrl[parsedUrl.length - 2];

      console.log(titleFromUrl);

      // Format title
      const title = titleFromUrl
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");

      // Get part that contains name of platform
      const platformFromUrl = parsedUrl
        .find((e) => e.slice(0, 3) === "www")
        .split(".")[1];

      // Format platform name
      const platform =
        platformFromUrl[0].toUpperCase() + platformFromUrl.slice(1);

      this.setState({ url: value, title, platform });

      // If url is removed, remove the title
    } else if (name === "url" && !value) {
      this.setState({ title: "" });
    }

    this.setState({ [name]: value });
  };

  addCourse = async (e) => {
    e.preventDefault();

    const { title, url, platform, category, categories } = this.state;

    const category_id = categories.find((e) => e.name === category).id;

    await api.addCourse(title, url, platform, category_id);

    this.setState({ showAlert: true });
  };

  render() {
    const { categories, showAlert } = this.state;
    return (
      <div className="w-50 mx-auto" id="add-course">
        {showAlert && (
          <div className="alert alert-success" role="alert">
            Course saved!
          </div>
        )}
        {!showAlert && (
          <form className="my-3">
            <input
              className="form-control mb-2"
              name="url"
              value={this.state.url}
              onChange={this.handleInput}
              placeholder="Course url"
            />
            <input
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.handleInput}
              placeholder="Course title"
            />
            <div className="form-row mt-2">
              <div className="col-7">
                <input
                  className="form-control"
                  name="platform"
                  value={this.state.platform}
                  onChange={this.handleInput}
                  placeholder="Platform"
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  id="category"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleInput}
                >
                  <option>Choose category</option>
                  {categories.map((category, i) => (
                    <option key={i}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="btn btn-outline-dark mt-2 px-3"
              onClick={this.addCourse}
            >
              Add
            </button>
          </form>
        )}
      </div>
    );
  }
}
