-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
  id INT(11) NOT NULL,
  title VARCHAR(255) NOT NULL,
  release_date VARCHAR(15),
  vote_average FLOAT(11),
  poster_path VARCHAR(255),
  PRIMARY KEY (id)
);