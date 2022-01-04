CREATE TYPE roles AS ENUM('admin',
'users');

CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
password VARCHAR(140) NOT NULL,
login VARCHAR(20) NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
user_role roles,
FOREIGN KEY(movie_id) REFERENCES movies(id),
FOREIGN KEY(rate_id) REFERENCES ratings(id)
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY NOT NULL,
    adult BOOLEAN NOT NULL,
backdrop_path TEXT,
budget INT NOT NULL,
homepage VARCHAR(255),
imdb_id VARCHAR(55),
original_language VARCHAR(55),
original_title VARCHAR(255),
overview TEXT,
popularity INT NOT NULL,
poster_path TEXT,
release_date VARCHAR(255),
revenue INT NOT NULL,
runtime INT,
FOREIGN KEY(genres) REFERENCES genres(id),
FOREIGN KEY(users_id) REFERENCES users(id)
);

CREATE TABLE genres(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100)
    FOREIGN KEY(movie_id) REFERENCES movies(id)
);

CREATE TABLE ratings(
 id SERIAL PRIMARY KEY NOT NULL,
 rate INT NOT NULL,
  FOREIGN KEY(users_id) REFERENCES users(id),
 FOREIGN KEY(movie_id) REFERENCES movies(id)
);