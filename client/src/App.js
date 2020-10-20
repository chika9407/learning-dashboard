import React from "react";
import "./App.css";
import AddCourse from "./components/AddCourse";
import CourseCard from "./components/CourseCard";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      courses: [],
    };
  }

  componentDidMount() {
    this.getCourses();
    this.getCollections();
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

  render() {
    const { courses, collections } = this.state;
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addcourse">
                  Add course
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="app container text-center p-4">
          <Switch>
            <Route path="/addcourse">
              <AddCourse collections={collections} />
            </Route>
            <Route path="/">
              <div>
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
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
