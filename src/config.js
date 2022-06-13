require('dotenv').config();

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

const config = {
  MONGODB_URI: NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};

module.exports = config;
