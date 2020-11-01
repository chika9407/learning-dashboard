INSERT INTO categories (name) VALUES ("Computer Science");
INSERT INTO categories (name) VALUES ("Data Analytics");
INSERT INTO categories (name) VALUES ("React");

INSERT INTO courses (title, url, platform, category_id, status, progress) VALUES ("CS50 Introduction to Computer Science", "https://www.edx.org/course/cs50s-introduction-to-computer-science", "edx", 1, "completed", 100);
INSERT INTO courses (title, url, platform, category_id, status, progress) VALUES ("CS50 Understanding Technology", "https://www.edx.org/course/cs50s-understanding-technology", "edx", 1, "completed", 100);
INSERT INTO courses (title, url, platform, category_id, status, progress) VALUES ("Algorithms Part 1", "https://www.coursera.org/learn/algorithms-part1", "edx", 1, "in progress", 50);

INSERT INTO courses (title, url, platform, category_id, status, progress) VALUES ("Learn SQL Basics", "https://www.coursera.org/specializations/learn-sql-basics-data-science", "coursera", 2, "in progress", 25);

INSERT INTO courses (title, url, platform, category_id) VALUES ("Complete Intro to React", "https://frontendmasters.com/courses/complete-react-v5/", "frontend masters", 3);
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


INSERT INTO users (username, password) VALUES ("test", "test");
