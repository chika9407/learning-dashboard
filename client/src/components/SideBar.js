import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], selected: "" };
  }

  async componentDidMount() {
    try {
      // fetch all categories and courses
      const categories = await api.getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = (id) => {
    this.setState({ selected: id });
  };

  handleReset = () => {
    this.setState({ selected: 0 });
  };

  render() {
    const { categories, selected } = this.state;
    return (
      <div className="vh-100 d-inline-block border-right" id="sidebar">
        <nav className="nav flex-column mt-5 mx-3 nav-pills">
          <Link
            className="navbar-text ml-3 text-secondary font-weight-bold"
            onClick={this.handleReset}
            to="/"
          >
            Categories
          </Link>
          {categories.map((category, i) => (
            <Link
              className={
                selected === category.id
                  ? "active nav-link text-capitalize"
                  : "nav-link text-capitalize"
              }
              onClick={() => this.handleClick(category.id)}
              to={`/${category.id}`}
              key={i}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    );
  }
}
