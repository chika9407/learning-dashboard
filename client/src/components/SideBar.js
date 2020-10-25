import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], selected: "", newCategory: "" };
  }

  async componentDidMount() {
    try {
      // fetch categories
      const categories = await api.getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  // Nav methods

  handleClick = (id) => {
    this.setState({ selected: id });
  };

  handleReset = () => {
    this.setState({ selected: 0 });
  };

  // Form methods

  handleInput = (e) => {
    this.setState({ newCategory: e.target.value });
  };

  addCategory = async (e) => {
    e.preventDefault();

    try {
      // Add new category to database
      await api.addCategory(this.state.newCategory.toLowerCase());
      // Fetch categories again to reflect changes in sidebar
      const categories = await api.getCategories();
      this.setState({ categories, newCategory: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { categories, selected, newCategory } = this.state;
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
          <form className="form-inline my-3 ml-2">
            <input
              className="form-control"
              name="category"
              value={this.state.newCategory}
              onChange={this.handleInput}
              placeholder="Add a category..."
            />
            <button
              className="btn btn-outline-dark mt-2"
              onClick={this.addCategory}
            >
              Add
            </button>
          </form>
        </nav>
      </div>
    );
  }
}
