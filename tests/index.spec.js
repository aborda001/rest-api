const supertest = require('supertest');
const app = require('../src/app');
const server = require('../src/index');
const User = require('../src/models/user.model');
const Task = require('../src/models/task.model');
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
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
  {
    username: 'validuser',
    password: 'test031220',
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

  test('should respond with a 201 status code', async () => {
    await api
      .post('/api/v1/users')
      .send(users[2])
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

  test('should respond with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send(users[2]);

    await api
      .delete('/api/v1/users/')
      .set({
        'x-access-token': response.body.token,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(/deleted/);
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

  test('should responde with a 401 status code', async () => {
    await api
      .post('/api/v1/auth')
      .send({
        username: 'bad',
        password: 'test011220',
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('should responde with a 401 status code', async () => {
    await api
      .get('/api/v1/tasks')
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Tasks methods', () => {
  var taskId;

  test('should responde with a 201 status code', async () => {
    const response = await api.post('/api/v1/auth').send({
      username: 'agooduser002',
      password: users[1].password,
    });
    await api
      .post('/api/v1/tasks')
      .set({
        'x-access-token': response.body.token,
      })
      .send({
        name: 'task1 test',
        description: 'task1 description',
        done: false,
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.task).toBeDefined();
      });
  });

  test('should responde with a 401 status code', async () => {
    await api
      .post('/api/v1/tasks')
      .send({
        name: 'task1',
        description: 'task1 description',
        done: false,
      })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('should responde with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send({
      username: 'agooduser002',
      password: users[1].password,
    });
    await api
      .get('/api/v1/tasks')
      .set({
        'x-access-token': response.body.token,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.tasks).toBeDefined();
      });
  });

  test('should responde with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send({
      username: 'agooduser002',
      password: users[1].password,
    });
    await api
      .get('/api/v1/tasks?limit=1')
      .set({
        'x-access-token': response.body.token,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.tasks.length).toBe(1);
        taskId = res.body.tasks[0]._id;
      });
  });

  test('should responde with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send({
      username: 'agooduser002',
      password: users[1].password,
    });

    await api
      .patch(`/api/v1/tasks/${taskId}`)
      .set({
        'x-access-token': response.body.token,
      })
      .send({
        name: 'task1 test updated',
        description: 'task1 description updated',
        done: true,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.task).toBeDefined();
      });
  });

  test('should responde with a 200 status code', async () => {
    const response = await api.post('/api/v1/auth').send({
      username: 'agooduser002',
      password: users[1].password,
    });

    await api
      .delete(`/api/v1/tasks/${taskId}`)
      .set({
        'x-access-token': response.body.token,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.task).toBeDefined();
      });
  });
});

afterAll(() => {
  server.close();
});
