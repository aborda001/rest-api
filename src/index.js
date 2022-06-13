const app = require('./app');
const config = require('./config');
require('./database');

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
