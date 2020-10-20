import React from "react";
import "./App.css";
import AddCourseForm from "./components/AddCourseForm";
import CourseCard from "./components/CourseCard";
import NavBar from "./components/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      courses: [],
    };
  }

  getCollections = () => {
    fetch(`/collections`)
      .then((res) => res.json())
      .then((data) => this.setState({ collections: data }))
      .catch((error) => console.log(error));
  };

  getCourses = () => {
    fetch(`/courses`)
      .then((res) => res.json())
      .then((data) => this.setState({ courses: data }))
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getCourses();
    this.getCollections();
  }

  render() {
    const { courses, collections } = this.state;
    return (
      <div className="app">
        <NavBar />
        <div className="container text-center p-4">
          <h2>Your courses:</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {courses.map((course, i) => (
              <CourseCard
                collection={collections.find(
                  (e) => e.id === course.collection_id
                )}
                course={course}
                key={i}
              />
            ))}
          </div>
          <h2>Add a new course</h2>
          {/* <AddCourseForm /> */}
        </div>
      </div>
    );
  }
}

export default App;
