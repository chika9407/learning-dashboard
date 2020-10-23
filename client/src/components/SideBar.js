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

  render() {
    const { categories } = this.state;
    return (
      <div className="vh-100 d-inline-block border-right" id="sidebar">
        <nav className="nav flex-column mt-5 mx-3 nav-pills">
          <span className="navbar-text">Categories</span>
          {categories.map((category, i) => (
            <Link
              className="nav-link text-capitalize"
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
