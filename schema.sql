-- MySQL schema for task_combinations
CREATE DATABASE IF NOT EXISTS task_combinations;
USE task_combinations;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(16) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS combinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS combination_sets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  combination_id INT NOT NULL,
  FOREIGN KEY (combination_id) REFERENCES combinations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS combination_items (
  set_id INT NOT NULL,
  item_id INT NOT NULL,
  PRIMARY KEY (set_id, item_id),
  FOREIGN KEY (set_id) REFERENCES combination_sets(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  combination_id INT NOT NULL,
  response_json JSON NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (combination_id) REFERENCES combinations(id) ON DELETE CASCADE
);


