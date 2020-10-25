INSERT INTO categories (name) VALUES ("computer science");
INSERT INTO categories (name) VALUES ("data analytics");
INSERT INTO categories (name) VALUES ("react");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("CS50 Introduction to Computer Science", "https://www.edx.org/course/cs50s-introduction-to-computer-science", "edx", 1, "completed");
INSERT INTO courses (title, url, platform, category_id, status) VALUES ("CS50 Understanding Technology", "https://www.edx.org/course/cs50s-understanding-technology", "edx", 1, "completed");
INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Algorithms Part 1", "https://www.coursera.org/learn/algorithms-part1", "edx", 1, "in progress");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Learn SQL Basics Data Science", "https://www.coursera.org/specializations/learn-sql-basics-data-science", "coursera", 2, "in progress");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Complete Intro to React", "https://frontendmasters.com/courses/complete-react-v5/", "frontend masters", 3, "in progress");
INSERT INTO courses (title, url, platform, category_id) VALUES ("React The Complete Guide incl Redux", "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", "udemy", 3);

INSERT INTO tasks (text, complete, course_id) VALUES ("Week 1", 1, 1);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 2", 1, 1);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 3", 1, 1);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 4", 1, 1);

INSERT INTO tasks (text, complete, course_id) VALUES ("Week 1", 1, 2);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 2", 1, 2);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 3", 1, 2);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 4", 1, 2);

INSERT INTO tasks (text, complete, course_id) VALUES ("Week 1", 1, 3);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 2", 1, 3);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 3", 0, 3);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 4", 0, 3);

INSERT INTO tasks (text, complete, course_id) VALUES ("Week 1", 1, 4);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 2", 0, 4);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 3", 0, 4);
INSERT INTO tasks (text, complete, course_id) VALUES ("Week 4", 0, 4);
