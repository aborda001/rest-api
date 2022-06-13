# Getting started

Node version: 16.2.0

Npm Version: 7.13.0

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start:dev` to start the local server with hot reloading
- `npm run start` to start the local server without hot reloading

Testing

- `npm run test` to run the tests
- `npm run test:watch` to run the tests in watch mode

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript objects
