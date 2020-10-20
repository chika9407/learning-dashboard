DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS collections;

CREATE TABLE `courses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	`url` VARCHAR(255) NOT NULL,
	`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`complete` BOOLEAN NOT NULL DEFAULT '0',
	`collection_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`complete` BOOLEAN NOT NULL DEFAULT '0',
	`course_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `collections` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`);

