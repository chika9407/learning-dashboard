import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],

      selected: "",
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

  handleSelect = (e) => {
    this.setState({ selected: e.target.value });
  };

  filteredCourses = () => {
    const { courses, selected } = this.state;
    if (!selected) return courses;
    else return courses.filter((course) => course.status === selected);
  };

  render() {
    const { categories, selected } = this.state;
    const courses = this.filteredCourses();

    return (
      <div className="pt-5 ml-5">
        <div className="d-flex ml-4">
          <h2>My List</h2>
          <select
            className="form-control w-auto ml-4"
            value={selected}
            onChange={this.handleSelect}
          >
            <option value="">All courses</option>
            <option value="in progress">In progress</option>
            <option value="on hold">On hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="d-flex flex-wrap">
          {courses.map((course, i) => (
            <div
              key={i}
              // className={
              //   course.status === "in progress" ? "order-1" : "order-2"
              // }
            >
              <CourseCard
                category={categories?.find((e) => e.id === course.category_id)}
                course={course}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
