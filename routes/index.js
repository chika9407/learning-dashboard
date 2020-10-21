var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* Collections */

// GET list of collections
router.get("/collections", function (req, res, next) {
  db("SELECT * FROM collections;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new collection
router.post("/collections", function (req, res, next) {
  db(`INSERT INTO collections (name) VALUES ("${req.body.name}");`)
    .then(() => {
      res.send("New collection added");
    })
    .catch((err) => res.status(500).send(err));
});

/* Courses */

// GET list of courses
router.get("/courses", function (req, res, next) {
  db("SELECT * FROM courses;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one course
router.get("/courses/:id", function (req, res, next) {
  db(`SELECT * FROM courses WHERE id = ${req.params.id};`)
    .then((results) => {
      res.send(results.data[0]);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new course
router.post("/courses", function (req, res, next) {
  const { title, url, platform, collection } = req.body;

  db(
    `INSERT INTO courses (title, url, platform, collection_id) VALUES ("${title}", "${url}", "${platform}", ${collection});`
  )
    .then(() => {
      res.send("New course added");
    })
    .catch((err) => res.status(500).send(err));
});

// UPDATE a course
router.put("/courses/:id", function (req, res, next) {
  db(
    `UPDATE courses SET complete = ${req.body.complete} WHERE id = ${req.params.id};`
  )
    .then(() => {
      res.send("Course updated");
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE a course
router.delete("/courses/:id", function (req, res, next) {
  // first delete all tasks related to this course
  db(`DELETE FROM tasks WHERE course_id = ${req.params.id};`)
    .then(() =>
      // then delete the course
      db(`DELETE FROM courses WHERE id = ${req.params.id};`)
        .then(() => res.send("Course deleted"))
        .catch((err) => res.status(500).send(err))
    )
    .catch((err) => res.status(500).send(err));
});

/* Tasks */

// GET list of tasks for one course
router.get("/courses/:id/tasks", function (req, res, next) {
  db(`SELECT * FROM tasks WHERE course_id = ${req.params.id};`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// INSERT a new task
router.post("/courses/:id/tasks", function (req, res, next) {
  db(
    `INSERT INTO tasks (name, course_id) VALUES ("${req.body.name}", ${req.params.id});`
  )
    .then(() => {
      res.send("New task added");
    })
    .catch((err) => res.status(500).send(err));
});

// UPDATE a task
router.put("/tasks/:id", function (req, res, next) {
  db(
    `UPDATE tasks SET complete = ${req.body.complete} WHERE id = ${req.params.id};`
  )
    .then(() => {
      res.send("Task updated");
    })
    .catch((err) => res.status(500).send(err));
});

// DELETE a task
router.delete("/tasks/:id", function (req, res, next) {
  db(`DELETE FROM tasks WHERE id = ${req.params.id};`)
    .then(() => {
      res.send("Task deleted");
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
