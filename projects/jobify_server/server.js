import express from "express";
import "express-async-errors";
import cors from "cors";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import authenticateUser from "./middleware/auth.js";
// db and authenticateUser
import connectDB from "./db/connect.js";
// routers
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
app.use(express.static(path.resolve(__dirname, "../jobify/dist")));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.get("/api/v1", (req, res) => {
  res.send({ msg: "welcome" });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobsRoutes);
app.get("*", (res, req) => {
  res.sendFile(path.resolve(__dirname, "../jobify/dist", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

void start();
