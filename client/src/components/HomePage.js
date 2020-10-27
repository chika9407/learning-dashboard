import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";
import AddCourse from "./AddCourse";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      courses: [],
      selected: "in progress",
      showForm: false,
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

  handleClick = () => {
    this.setState({ showForm: true });
  };

  render() {
    const { categories, selected, showForm } = this.state;
    const courses = this.filteredCourses();

    return (
      <div className="mt-4 pt-5 ml-5" id="home">
        <div className="d-flex ml-4 justify-content-center">
          <h2>My Courses</h2>
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
        <hr className="w-50" />
        <div className="mt-5">
          <h4>Add a course</h4>
          <button
            onClick={this.handleClick}
            className={
              showForm ? "d-none" : "btn btn-outline-dark rounded-circle"
            }
          >
            <i className="fas fa-plus"></i>
          </button>
          {showForm && <AddCourse />}
        </div>
      </div>
    );
  }
}
