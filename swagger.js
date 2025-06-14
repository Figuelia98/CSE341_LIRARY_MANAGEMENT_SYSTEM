const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'LIBRARY MANAGEMENT SYSTEM API',
    description: ' Finale project API CSE41 Class BYU IDAHO Software Development'
  },
  host: 'localhost:8080',
  schemes:['http','https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];


swaggerAutogen(outputFile, routes, doc);