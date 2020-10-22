import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";

export default class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
      selectedCategory: "",
    };
  }

  async componentDidMount() {
    try {
      // fetch all categories and courses
      const categories = await api.getCategories();
      const courses = await api.getCourses();

      this.setState({ categories, courses });
    } catch (error) {
      console.log(error);
    }
  }

  handleSelect = async (e) => {
    const { categories } = this.state;
    let courses = [];
    let selectedCategory = "";

    if (e.target.value === "All courses") {
      // if default is selected, fetch all courses
      courses = await api.getCourses();
    } else {
      // otherwise fetch courses of selected category
      selectedCategory = e.target.value;

      // find category id
      const category_id = categories.find(
        (category) => category.name === selectedCategory
      ).id;

      courses = await api.getCourses(category_id);
    }

    this.setState({ courses, selectedCategory });
  };

  render() {
    const { courses, categories, selectedCategory } = this.state;

    return (
      <div>
        <h3>Courses</h3>
        <select
          className="form-control w-25 mx-auto"
          name="selectedCategory"
          value={this.state.selectedCategory}
          onChange={this.handleSelect}
        >
          <option>All courses</option>
          {categories.map((category, i) => (
            <option key={i}>{category.name}</option>
          ))}
        </select>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.courses.map((course, i) => (
            <CourseCard
              category={categories?.find((e) => e.id === course.category_id)}
              course={course}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}
