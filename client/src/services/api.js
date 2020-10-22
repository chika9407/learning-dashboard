/* This file contains all fetch calls */

export default {
  /* Categories */

  // GET categories
  async getCategories() {
    const res = await fetch(`/categories`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

  // POST to add category
  async addCategory(name) {
    const res = await fetch(`/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  /* Courses */

  // GET courses
  async getCourses() {
    const res = await fetch(`/courses`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

  // GET one course
  async getCourse(id) {
    const res = await fetch(`/courses/${id}`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

  // POST to add a course
  async addCourse(title, url, platform, category_id) {
    const res = await fetch(`/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url, platform, category_id }),
    });
    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  // DELETE course
  async deleteCourse(id) {
    const res = await fetch(`/courses/${id}`, {
      method: "DELETE",
    });
    console.log(res);

    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  /* Tasks */

  // GET tasks
  async getTasks(id) {
    const res = await fetch(`/courses/${id}/tasks`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

  // POST to add task
  async addTask(id, text) {
    const res = await fetch(`/courses/${id}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  // PUT to update task
  async updateTask(id, complete) {
    const res = await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: !complete }),
    });
    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  // DELETE task
  async deleteTask(id) {
    const res = await fetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return;
    else throw new Error("Something went wrong");
  },
};
