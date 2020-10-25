import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";

export default class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
    };
  }

  async componentDidMount() {
    // get course id from url parameter
    const { categoryId } = this.props.match.params;

    try {
      // fetch all categories and courses
      const categories = await api.getCategories();
      const courses = await api.getCourses(categoryId);

      this.setState({ categories, courses });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate() {
    // get course id from url parameter
    const { categoryId } = this.props.match.params;

    try {
      const courses = await api.getCourses(categoryId);

      this.setState({ courses });
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = async () => {
    // get course id from url parameter
    const { categoryId } = this.props.match.params;

    try {
      await api.deleteCategory(categoryId);
    } catch (error) {
      console.log(error);
    }

    // navigate back to home page
    this.props.history.push("/");
  };

  render() {
    const { categories, courses } = this.state;

    return (
      <div className="pt-3">
        <div className="d-flex flex-wrap">
          {courses.map((course, i) => (
            <div
              key={i}
              className={course.status === "active" ? "order-1" : "order-2"}
            >
              <CourseCard
                category={categories?.find((e) => e.id === course.category_id)}
                course={course}
              />
            </div>
          ))}
        </div>
        {courses.length === 0 && <p className="mt-5 text-left">No courses</p>}
      </div>
    );
  }
}
