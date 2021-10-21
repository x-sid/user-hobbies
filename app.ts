import mongoose from "mongoose";
import cors from "cors";
import { NotFoundError, ApiError, InternalError } from "./core/errorHandler";
import express, { Request, Response, NextFunction } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
const {
  environment,
  mongoUrl,
  mongoOptions,
  swaggerOptions,
} = require("./config");

dotenv.config();

const app = express();
const baseUrl: string = "/api/v1";
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const initializeDB = async (): Promise<any> => {
  mongoose.connect(mongoUrl, mongoOptions, (err: any) => {
    if (err) return console.log(err);
    console.log("connected to database");
  });
};

const initializeServer = async () => {
  await initializeDB();
  //parses the request coming into json object
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.get("/health", (req: Request, res: Response) =>
    res.json({ status: "Running" })
  );

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.use(`${baseUrl}`, require("./routes/").default);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new NotFoundError())
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      return ApiError.handle(err, res);
    }

    if (environment === "development") {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }

    ApiError.handle(new InternalError(), res);
  });
};

initializeServer();

export default app;
