const supertest = require("supertest");
const server = require('../index').server;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDIxMDU0MDEsImV4cCI6MTY0MjE5MTgwMX0.SgHjVQlPIDJxzJkbAjdYuXEMmJlpkamWyrEyFr0zYac';

describe('/filters', () => {
    describe('get filters from database', () => {
        test('should be message: genres and languages arrays', (done) => {
            supertest(server)
                .get('/filters')
                .query({
                    token
                })
                .expect(200)
                .end(done)
        });
    });
    describe('get filters from database', () => {
        test('should be message: genres and languages arrays', (done) => {
            supertest(server)
                .get('/filters')
                .query({
                    token
                })
                .expect(200)
                .end(done)
        });
    });
});