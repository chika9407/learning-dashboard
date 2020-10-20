import React from "react";
import "./App.css";
import CourseCard from "./components/CourseCard";

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
    const { courses } = this.state;
    return (
      <div className="container text-center p-4">
        <h2>Your courses:</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {courses.map((course, i) => (
            <CourseCard course={course} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
