/* This file contains all fetch calls */

export default {
  // GET collections
  async getCollections() {
    const res = await fetch(`/collections`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

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

  // DELETE course
  async deleteCourse(id) {
    const res = await fetch(`/courses/${id}`, {
      method: "DELETE",
    });
    console.log(res);

    if (res.ok) return;
    else throw new Error("Something went wrong");
  },

  // GET tasks
  async getTasks(id) {
    const res = await fetch(`/courses/${id}/tasks`);
    if (res.ok) return await res.json();
    else throw new Error("Something went wrong");
  },

  // POST to add task
  async addTask(id, name) {
    const res = await fetch(`/courses/${id}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
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
