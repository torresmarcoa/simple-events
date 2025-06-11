const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple Events',
    description: 'API to manage events'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
