import React from "react";
import "./App.css";
import CoursePage from "./components/CoursePage";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
import CategoryPage from "./components/CategoryPage";
import DiscoverPage from "./components/DiscoverPage";
import Search from "./components/Search";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div className="container-fluid">
          <div className="row vh-100">
            <div className="col-2 border-right ">
              <SideBar />
            </div>
            <div className="col-10 text-center pl-5">
              <Switch>
                <Route exact path="/discover">
                  <DiscoverPage />
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Route path="/search/:q?">
                  {" "}
                  <Search />{" "}
                </Route>
                <PrivateRoute
                  exact
                  path="/courses/:course_id"
                  component={CoursePage}
                />
                <PrivateRoute
                  exact
                  path="/:category_id"
                  component={CategoryPage}
                />
                <PrivateRoute exact path="/">
                  <HomePage />
                </PrivateRoute>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
