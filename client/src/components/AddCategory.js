import React, { Component } from "react";
import api from "../services/api.js";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addCategory = async (e) => {
    e.preventDefault();

    await api.addCategory(this.state.category);

    this.setState({ category: "" });
  };

  render() {
    const { category } = this.state;
    return (
      <div className="d-inline-block mt-5">
        <h2>Add a new category</h2>
        <form className="my-3">
          <input
            className="form-control mb-2"
            name="category"
            value={this.state.category}
            onChange={this.handleInput}
            placeholder="Category"
          />
          <button
            className="btn btn-outline-dark mt-2"
            onClick={this.addCategory}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
