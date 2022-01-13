const supertest = require("supertest");
const server = require('../index').server;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDIxMDU0MDEsImV4cCI6MTY0MjE5MTgwMX0.SgHjVQlPIDJxzJkbAjdYuXEMmJlpkamWyrEyFr0zYac';

describe('/movies testing', () => {
    describe('first failed', () => {
        test('get all movies with status 200', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token
                })
                .expect(200)
                .end(done)
        });
    });
    describe('movies', () => {
        test('get all movies with status 200', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token
                })
                .expect(200)
                .end(done)
        });
        test('get by filters adult=true', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    adult: true
                })
                .expect(404)
                .end(done)
        });
        test('get by filters genre_id=10752', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    genre_id: 10752
                })
                .expect(200)
                .end(done)
        });
        test('get by filters languages=en', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    languages: 'en'
                })
                .expect(200)
                .end(done)
        });
        test('get by filters release_date_min=2012-12-12&release_date_max=2021-12-31', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    release_date_min: '2012-12-12',
                    release_date_max: '2021-12-31'
                })
                .expect(200)
                .end(done)
        });
        test('get by filters budget_min=1000000', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    budget_min: 1000000
                })
                .expect(200)
                .end(done)
        });
        test('all parameters filters ', (done) => {
            supertest(server)
                .get('/movies')
                .query({
                    token,
                    adult: false,
                    budget_min: 10000000,
                    release_data_min: '2012-12-12',
                    release_date_max: '2021-12-31',
                    languages: 'en',
                    genres_id: 10752
                })
                .expect(200)
                .end(done)
        });
    });
    describe('get movies by id', () => {
        test('get movie by movie_id = 1', (done) => {
            supertest(server)
                .get('/movies/id')
                .query({
                    token,
                    movie_id: 1
                })
                .expect(200)
                .end(done)
        });
        test('get movie by movie_id = 9000000 with status 404', (done) => {
            supertest(server)
                .get('/movies/id')
                .query({
                    token,
                    movie_id: 9000000
                })
                .expect(404)
                .end(done)
        });
    });
});