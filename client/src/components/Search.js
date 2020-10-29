import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../services/api";

export default function Search() {
  let [courses, setCourses] = useState();
  let [items, setItems] = useState();
  let history = useHistory();
  let { q } = useParams();

  //fetch all courses

  const fetchAllCourses = async () => {
    try {
      const course = await api.getAllCourses();
      setCourses(course);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(courses);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const changeRoute = (e) => {
    history.push(`/search/${e.target.value}`);
  };

  const search = () => {
    console.log("searching");
    //grab the categories/courses
    //filter it so I keep only the items that include the q (the params)
    //then set these results in the results/items state
  };
  {
    /*const query = q ? q.toLowerCase : "";
    const filteredCourses = courses.filter((e) =>
      e.toLowerCase().includes(query)
    );
    setItems(filteredCourses);
  };
  };*/
  }

  useEffect(() => {
    search();
  }, [q]);

  return (
    <div className="container mt-4">
      <h3>Type below to start search </h3>
      <input
        type="text"
        className="form-control"
        onChange={changeRoute}
        value={q}
      ></input>
    </div>
  );
}
