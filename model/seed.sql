INSERT INTO collections (name) VALUES ("Computer Science");
INSERT INTO collections (name) VALUES ("Data Analytics");
INSERT INTO collections (name) VALUES ("React");

INSERT INTO courses (title, url, platform, collection_id, complete) VALUES ("CS50 Introduction to Computer Science", "https://www.edx.org/course/cs50s-introduction-to-computer-science", "edx", 1, 1);
INSERT INTO courses (title, url, platform, collection_id, complete) VALUES ("CS50 Understanding Technology", "https://www.edx.org/course/cs50s-understanding-technology", "edx", 1, 1);
INSERT INTO courses (title, url, platform, collection_id) VALUES ("Algorithms Part 1", "https://www.coursera.org/learn/algorithms-part1", "edx", 1);

INSERT INTO courses (title, url, platform, collection_id) VALUES ("Learn SQL Basics Data Science", "https://www.coursera.org/specializations/learn-sql-basics-data-science", "coursera", 2);

INSERT INTO courses (title, url, platform, collection_id) VALUES ("Complete Intro to React", "https://frontendmasters.com/courses/complete-react-v5/", "frontend masters", 3);
INSERT INTO courses (title, url, platform, collection_id) VALUES ("React The Complete Guide incl Redux", "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", "udemy", 3);
