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
};
