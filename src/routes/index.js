const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', require('./users.routes'));
  router.use('/auth', require('./auth.routes'));
}

module.exports = routerApi;
