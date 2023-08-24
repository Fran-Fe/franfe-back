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
        description: "Test in Local"
      },
      {
        url: "http://54.241.187.138:3000",
        description: "Test in Real Server with Real DB"
      }
    ],
  },
  apis: ["./src/routes/forAI/*.js", "./src/routes/forFront/*.js", "../src/routes/forFront/*.js", "../src/routes/forAI/*.js"],
}

export const specs = swaggereJsdoc(options)
