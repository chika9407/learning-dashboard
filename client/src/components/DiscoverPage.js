import React, { Component } from "react";

export default class DiscoverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [
        "https://www.coursera.org/",
        "https://www.udemy.com/",
        "https://www.edx.org/",
        "https://www.linkedin.com/learning/",
      ],
      url: "",
    };
  }

  handleInput = (e) => {
    this.setState({ url: e.target.value });
  };

  addResource = (e) => {
    e.preventDefault();
    const resources = [...this.state.resources];
    resources.push(this.state.url);

    this.setState({
      resources,
      url: "",
    });
  };

  render() {
    const { resources, url } = this.state;

    return (
      <div className="pt-5" id="resource-list">
        <h2>Resources</h2>
        <ul className="list-group w-50 mx-auto px-5 mt-3">
          {resources.map((resource, i) => (
            <a
              href={resource}
              target="_blank"
              className="list-group-item list-group-item-action"
              key={i}
            >
              {resource}
            </a>
          ))}
        </ul>
        <form className="form-row justify-content-center mt-4">
          <input
            className="form-control w-25 mr-2"
            name="url"
            value={url}
            onChange={this.handleInput}
            placeholder="URL"
          />

          <button className="btn btn-outline-dark" onClick={this.addResource}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
