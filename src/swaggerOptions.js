const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task authentication API',
      version: '1.0.0',
      description: 'Task authentication API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
  schemes: ['./src/models/*.js'],
};

module.exports = options;
