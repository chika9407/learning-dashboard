import React, { Component } from "react";

export default class DiscoverPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [
        {
          name: "Coursera",
          url: "https://www.coursera.org/",
        },
        { name: "Udemy", url: "https://www.udemy.com/" },
        { name: "edX", url: "https://www.edx.org/" },
        {
          name: "LinkedIn Learning",
          url: "https://www.linkedin.com/learning/",
        },
        {
          name: "Skillshare",
          url: "https://www.skillshare.com/",
        },
      ],
    };
  }

  render() {
    const { resources } = this.state;

    const compare = (a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    };

    return (
      <div className="pt-5" id="resource-list">
        <h2>Resources</h2>
        <ul className="list-group w-50 mx-auto px-5 mt-3">
          {resources.sort(compare).map((resource) => (
            <a
              href={resource.url}
              target="_blank"
              className="list-group-item list-group-item-action"
            >
              {resource.name}
            </a>
          ))}
        </ul>
      </div>
    );
  }
}
