import React, { Component } from "react";
import CourseCard from "./CourseCard";
import api from "../services/api.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      courses: [],
    };
  }

  // fetch collections and courses to load the state on render
  async componentDidMount() {
    try {
      const collections = await api.getCollections();
      const courses = await api.getCourses();
      this.setState({ collections, courses });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { courses, collections } = this.state;
    return (
      <div>
        <h2>Your courses:</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {courses?.map((course, i) => (
            <CourseCard
              collection={collections?.find(
                (e) => e.id === course.collection_id
              )}
              course={course}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}
