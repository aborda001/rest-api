const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

routerApi(app);

module.exports = app;
