import swaggerJsdoc from "swagger-jsdoc";

const SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lumi Data Hub",
      version: "1.0.0",
      description: "Lumi Data Hub API",
    },
    serves: [
      {
        url: "http://localhost:8080",
      }
    ]
  },
  apis: ["./src/routes/*.ts"],
}
const swaggerDocument = swaggerJsdoc(SwaggerOptions);
export default swaggerDocument;
