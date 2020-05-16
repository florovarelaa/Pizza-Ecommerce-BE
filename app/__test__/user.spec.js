const supertest = require('supertest');
const app = require('../app.js');
const sql = require('../models/db.js');

let id_test_user;

beforeAll(done => {
    done()
  })
  
afterAll( done => {
// closing the DB connection allows jest to exit successfully.
    sql.end()
    done()
})

describe("Testing the users API", () => {

    const user = {
        username: 'test_user',
        pass: '654321',
        firstname: 'test_user_firstname',
        lastname: 'test_user_lastname',
        email: 'test_user@test.com',
    }

    it('It should save user to the database with post /user method', async done => {

        const responsePostUser = await supertest(app).post('/users').send(user);
        const responseGetUserByUsername = await supertest(app).get(`/users/username/${user.username}`)

        //sets constant of testing user
        id_test_user = responsePostUser.body.id_user;

        expect(responsePostUser.statusCode).toBe(200);
        expect(responseGetUserByUsername.statusCode).toBe(200);
        expect(responseGetUserByUsername.body.username).toBe(user.username);
        done();
    });

    it('It should response the get /users', async done => {
        const response = await supertest(app).get('/users');
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.statusCode).toBe(200);
        done();
    });

    it('It should response the get /users/:id_user method', async done => {
        const response = await supertest(app).get(`/users/${id_test_user}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id_user).toBe(id_test_user);
        done();
    });

    it('It should response the get /users/:username method', async done => {
        const response = await supertest(app).get(`/users/username/${user.username}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe(`${user.username}`);
        done();
    });

    it('It should update user in the database with put /user/:id_user method', async done => {
        const user = {
            firstname: 'userUpdatedWithTest',
            lastname: 'UpdateduserWithTest',
            email: 'updateduser@withTest.com',
        }
        const responsePutuser = await supertest(app).put(`/users/${id_test_user}`).send(user);
        const responseGetuserById = await supertest(app).get(`/users/${id_test_user}`)
        expect(responsePutuser.statusCode).toBe(200);
        expect(responseGetuserById.statusCode).toBe(200);
        expect(responseGetuserById.body.firstname).toBe(user.firstname);
        done();
    });

    it('It should delete user in the database with delete /user/:id_user method', async done => {

        const responseDeleteuser = await supertest(app).del(`/users/${id_test_user}`);
        expect(responseDeleteuser.statusCode).toBe(200);
        done();
    });
});