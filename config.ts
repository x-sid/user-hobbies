import { config } from "dotenv";
config();

const {
  NODE_PORT,
  NODE_ENV,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_TEST_USERNAME,
  MONGODB_TEST_PASSWORD,
  MONGODB_TEST_DATABASE,
  MONGODB_TEST_HOST
} = process.env;

const environment = NODE_ENV;
const port = NODE_PORT || 4500;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoTestUrl = `mongodb+srv://${MONGODB_TEST_USERNAME}:${MONGODB_TEST_PASSWORD}@${MONGODB_TEST_HOST}/${MONGODB_TEST_DATABASE}?retryWrites=true&w=majority`;
const mongoAppUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

const mongoUrl = environment === "development" ? mongoAppUrl : mongoTestUrl;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*/*.ts", "./routes/*/*.js"],
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
};

export { environment, mongoUrl, mongoOptions, port, swaggerOptions };
