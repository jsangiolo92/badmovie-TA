-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
  id INT(11) NOT NULL auto_increment,
  movie_id INT(11) NOT NULL,
  movie_name VARCHAR(255) NOT NULL,
  vote_count INT(11),
  vote_average FLOAT(11),
  PRIMARY KEY (id)
);