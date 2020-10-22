import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
    };
  }

  // fetch collections and courses to load the state on render
  async componentDidMount() {
    try {
      const categories = await api.getCategories();
      const courses = await api.getCourses();
      this.setState({ categories, courses });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { courses, categories } = this.state;
    const activeCourses = courses?.filter(
      (course) => course.status === "active"
    );
    const otherCourses = courses?.filter(
      (course) => course.status !== "active"
    );

    return (
      <div className="pt-5">
        <h2>Courses you're taking</h2>
        <div className="d-flex flex-wrap justify-content-center border-bottom pb-3 mb-5">
          {activeCourses.map((course, i) => (
            <CourseCard
              category={categories?.find((e) => e.id === course.category_id)}
              course={course}
              key={i}
            />
          ))}
        </div>
        <h3>Other courses</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {otherCourses.map((course, i) => (
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
