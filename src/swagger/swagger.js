import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'
const endpointsFiles = ['../routes/forAI/cafesRoutes.js']

const doc = {
  info: {
    version: "1.0.0",
    title: "Franfe Backend",
    description: "Franfe Backend <b>Api</b>."
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "User",
      "description": "Endpoints"
    }
  ],
}

swaggerAutogen(outputFile, endpointsFiles, doc);
