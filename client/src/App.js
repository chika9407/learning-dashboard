import React from "react";
import "./App.css";
import AddCourse from "./components/AddCourse";
import CoursePage from "./components/CoursePage";
import NavBar from "./components/NavBar";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";

class App extends React.Component {
  render() {
    return (
      <div>
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
              <AddCourse />
            </Route>

            <Route path="/courses/:id" component={CoursePage} />

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
