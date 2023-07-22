import {swaggerUi} from './swagger.js';
import swaggereJsdoc from './swagger.js';

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Franfe Backend Api",
      description:
        "Node.js Swaager Franfe Backend Api 통신 방식 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["../routes/forAI/*.js", "./routes/forFront/*.js"],
}

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }