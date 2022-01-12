module.exports = {
    SELECT_QUERY_WITHOUT_GENRES: `SELECT * FROM movies `,
    SELECT_QUERY_WITH_GENRES: `SELECT * FROM movies LEFT JOIN
    movies_genres ON movies.id = movie_id `,
    SELECT_QUERY_WITH_GENRES_TOTALCOUNT: `SELECT COUNT(id) FROM movies LEFT JOIN
    movies_genres ON movies.id = movie_id `,
    SELECT_QUERY_WITHOUT_GENRES_TOTALCOUNT: `SELECT COUNT(id) FROM movies `
}