const supertest = require("supertest");
const server = require('../index').server;

describe("POST users/sign_up", () => {
    describe("create a new user", () => {
        describe('given a login, password, first_name, last_name and user_role', () => {
            test('should resbond with status code 201', (done) => {
                supertest(server).post('/users/sign_up')
                    .send({
                        login: 'Billy',
                        password: 'DragAndDrop1',
                        first_name: 'Joe',
                        last_name: 'Doe',
                        user_role: 'users'
                    })
                    .expect(201)
                    .end(done);
            });
        });
    });
    describe('get failed sign_up', () => {
        test('should respons with status code 400 when body without user_role', (done) => {
            supertest(server).post('/users/sign_up')
                .send({
                    login: 'Bill',
                    password: 'DragAndDrop1',
                    first_name: 'Joe',
                    last_name: 'Doe'
                })
                .expect(400)
                .end(done);
        });
        test('should respons with status code 400 when body without last_name', (done) => {
            supertest(server).post('/users/sign_up')
                .send({
                    login: 'Bill',
                    password: 'DragAndDrop1',
                    first_name: 'Joe',
                    user_role: 'users'
                })
                .expect(400)
                .end(done);
        });
        test('should respons with status code 400 when body with only login and password', (done) => {
            supertest(server).post('/users/sign_up')
                .send({
                    login: 'Bill',
                    password: 'DragAndDrop1'
                })
                .expect(400)
                .end(done);
        });
    });
});
