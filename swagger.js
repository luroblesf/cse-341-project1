const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Project 1 API',
        description: 'API documentation for Friends and Groups API'
    },
    host: 'cse-341-project1-lahm.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger-output.json';

const endpointsFiles = [
    './server.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);