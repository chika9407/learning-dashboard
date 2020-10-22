import React from "react";
import "./App.css";
import AddCourse from "./components/AddCourse";
import AddCategory from "./components/AddCategory";
import CoursePage from "./components/CoursePage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div className="app container text-center p-4">
          <Switch>
            <Route path="/addcourse">
              <AddCourse />
            </Route>
            <Route path="/addcategory">
              <AddCategory />
            </Route>
            <Route path="/courses/:id" component={CoursePage} />
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
