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
    const { category_id } = this.props.match.params;

    try {
      // fetch all categories and courses
      const categories = await api.getCategories();
      const courses = await api.getCourses(category_id);

      this.setState({ categories, courses });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate() {
    // get course id from url parameter
    const { category_id } = this.props.match.params;

    try {
      const courses = await api.getCourses(category_id);

      this.setState({ courses });
    } catch (error) {
      console.log(error);
    }
  }

  handleDelete = async () => {
    // get course id from url parameter
    const { category_id } = this.props.match.params;

    try {
      await api.deleteCategory(category_id);
    } catch (error) {
      console.log(error);
    }

    // navigate back to home page
    this.props.history.push("/");
  };

  render() {
    const { categories, courses } = this.state;

    return (
      <div className="pt-5">
        <div className="d-flex flex-wrap justify-content-center">
          {courses.map((course, i) => (
            <div key={i}>
              <CourseCard
                category={categories?.find((e) => e.id === course.category_id)}
                course={course}
              />
            </div>
          ))}
        </div>
        {!courses.length && <p className="mt-5 ">No courses</p>}
      </div>
    );
  }
}
