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

  deleteCategory = async (id) => {
    try {
      await api.deleteCategory(id);
      // Fetch categories again to reflect changes in sidebar
      const categories = await api.getCategories();
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }

    // navigate back to home page
    if (this.props.history) this.props.history.push("/");
  };

  render() {
    const { categories, selected, newCategory } = this.state;
    return (
      <div className="">
        <nav className="nav flex-column mt-5">
          <Link
            className="navbar-text ml-3 text-secondary font-weight-bold"
            onClick={this.handleReset}
            to="/"
          >
            Categories
          </Link>
          {categories.map((category, i) => (
            <div className="d-flex justify-content-between">
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
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                data-toggle="dropdown"
              ></a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Rename
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => this.deleteCategory(category.id)}
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
          <form className="form-inline mt-3">
            <input
              className="form-control w-75"
              name="category"
              value={newCategory}
              onChange={this.handleInput}
              placeholder="Category..."
            />
            <button
              className="btn btn-outline-dark px-2"
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
