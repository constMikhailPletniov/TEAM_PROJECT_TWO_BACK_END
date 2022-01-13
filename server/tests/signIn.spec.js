const supertest = require("supertest");
const server = require('../index').server;

describe('POST /users/sign_in', () => {
    describe('check user', () => {
        describe('check user data login and password', () => {
            test('check login and password', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        login: "Andrew",
                        password: "DragAndDrop1"
                    })
                    .expect(200)
                    .end(done)
            });
        });
        describe('check user data login and password', () => {
            test('check login and password', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        login: "Andrew",
                        password: "DragAndDrop1"
                    })
                    .expect(200)
                    .end(done)
            });
            test('get failed when forgot password', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        login: "Andrew"
                    })
                    .expect(400)
                    .end(done)
            });
            test('get failed when forgot login', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        password: "DragAndDrop1"
                    })
                    .expect(400)
                    .end(done)
            });
            test('get failed when login is invalid', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        password: "DragAndDrop1",
                        login: "Andre"
                    })
                    .expect(401)
                    .end(done)
            });
            test('should be setHeader token', (done) => {
                supertest(server)
                    .post('/users/sign_in')
                    .send({
                        password: "DragAndDrop1",
                        login: "Andrew"
                    })
                    .expect((res) => expect(res.headers['token']).not.toBe(undefined))
                    .end(done);
            });
        });
    });
});