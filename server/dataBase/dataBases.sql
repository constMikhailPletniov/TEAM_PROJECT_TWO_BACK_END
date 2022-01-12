CREATE TYPE roles AS ENUM('admin',
'users');

CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
password VARCHAR(140) NOT NULL,
login VARCHAR(20) NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
user_role roles,
unique(login)
);
CREATE TABLE genres(
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(100)
);

CREATE TABLE languages(
    id INT PRIMARY KEY NOT NULL,
   iso_639_1 VARCHAR(5),
english_name VARCHAR(30),
name VARCHAR(50)
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY NOT NULL,
    adult BOOLEAN,
backdrop_path TEXT NOT NULL,
budget INT NOT NULL,
homepage VARCHAR(255) NOT NULL,
imdb_id VARCHAR(55) NOT NULL,
original_language VARCHAR(55),
original_title VARCHAR(255),
title VARCHAR(255),
overview TEXT NOT NULL,
popularity INT,
poster_path TEXT NOT NULL,
release_date VARCHAR(255),
revenue BIGINT,
runtime INT NOT NULL,
tagline VARCHAR(255),
trailer VARCHAR(255)
);

CREATE TABLE movies_genres(
 movie_id INT NOT NULL,
genre_id INT NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id),
    FOREIGN KEY(genre_id) REFERENCES genres(id)
);


