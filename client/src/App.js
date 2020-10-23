import React from "react";
import "./App.css";
import AddCourse from "./components/AddCourse";
import AddCategory from "./components/AddCategory";
import CoursePage from "./components/CoursePage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllCourses from "./components/AllCourses";
import SideBar from "./components/SideBar";
import CourseList from "./components/CourseList";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <SideBar />
        <div className="app container p-4">
          <Switch>
            <Route path="/addcourse">
              <AddCourse />
            </Route>
            <Route path="/addcategory">
              <AddCategory />
            </Route>
            <Route path="/courses/:id" component={CoursePage} />
            <Route path="/courses">
              <AllCourses />
            </Route>
            <Route path="/:categoryId" component={CourseList} />

            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
