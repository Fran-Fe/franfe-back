import swaggereJsdoc from 'swagger-jsdoc';

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
  apis: ["./src/routes/forAI/*.js", "./src/routes/forFront/*.js"],
}

export const specs = swaggereJsdoc(options)
