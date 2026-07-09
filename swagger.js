const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Project 1 API',
        description: 'API documentation for CSE 341 Project 1'
    },
    host: 'cse-341-project1-lahm.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

