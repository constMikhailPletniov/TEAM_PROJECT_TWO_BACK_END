const supertest = require("supertest");
const { postUserData } = require("../controllers/signUp");

describe("POST users/sign_up", () => {
    describe("create a new user", () => {
        describe('given a login, password, first_name, last_name and user_role', () => {
            test('should resbond with status code 200', async () => {
                const resp = await supertest(postUserData).post('/users/sign_up').send({
                    login: 'Bill',
                    password: 'DragAndDrop1',
                    first_name: 'Joe',
                    last_name: 'Doe',
                    user_role: 'users'
                });
                expect(resp.statusCode).toBe(201);
            });
            test('should respond will defined', async () => {
                const resp = await supertest(postUserData).post('/users/sign_up').send({
                    login: 'Bill',
                    password: 'DragAndDrop1',
                    first_name: 'Joe',
                    last_name: 'Doe',
                    user_role: 'users'
                });
                expect(resp.body).toBeDefined();
            });
        });
    });
});
