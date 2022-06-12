const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = require('./swaggerOptions');

const app = express();

app.use(express.json());
app.use(cors());

const specs = swaggerJsDoc(options);

routerApi(app);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(logErrors);
app.use(errorHandler);

module.exports = app;
