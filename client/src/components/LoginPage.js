import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
//import AuthButton from "./AuthButton";
import auth from "./auth";

export default function LoginPage() {
  let [username, setUserName] = useState("test");
  let [password, setPassword] = useState("test");

  //helps to change the url
  let history = useHistory();
  //shows where the user is (his current url)
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword({
      [e.target.name]: e.target.value,
    });
  };

  const signin = async () => {
    auth.authenticate(() => {
      history.replace(from);
      console.log(history);
    });

    try {
      const results = await axios.post("/users/login", {
        username: username,
        password: password,
      });
      console.log(results.data);
      //store the token in my pocket
      localStorage.setItem("token", results.data.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  const requestData = async () => {
    try {
      const results = await axios("/users/profile", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(results);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <input
          value={setUserName}
          onChange={handleChangeUserName}
          name="username"
          type="text"
          className="form-control mb-2 mt-4"
        />
        <input
          value={setPassword}
          onChange={handleChangePassword}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-primary" onClick={signin}>
          Log in
        </button>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
    </div>
  );
}
