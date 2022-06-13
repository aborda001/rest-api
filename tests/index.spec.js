const supertest = require('supertest');
const app = require('../src/app');
const server = require('../src/index');
const User = require('../src/models/user.model');
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

const users = [
  {
    username: 'bad',
    password: 'test011220',
  },
  {
    username: 'agooduser001',
    password: 'test021220',
  },
];

describe('Users methods', () => {
  test('should respond with a 201 status code', async () => {
    await api
      .post('/api/v1/users')
      .send(users[1])
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('should respond with a 400 status code', async () => {
    await api
      .post('/api/v1/users')
      .send(users[0])
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('should respond with a 409 status code', async () => {
    await api
      .post('/api/v1/users')
      .send(users[1])
      .expect(409)
      .expect('Content-Type', /application\/json/);
  });

  test('should respond with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send(users[1]);

    await api
      .patch('/api/v1/users/')
      .set({
        'x-access-token': response.body.token,
      })
      .send({
        username: 'agooduser002',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/agooduser002/);
  });
});

describe('Auth methods ', () => {
  test('should responde with a 200 status code', async () => {
    await api
      .post('/api/v1/auth')
      .send({
        username: 'agooduser002',
        password: users[1].password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.token).toBeDefined();
      });
  });

  test('should responde with a 401 status code', async () => {
    await api
      .post('/api/v1/auth')
      .send(users[0])
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  server.close();
});
