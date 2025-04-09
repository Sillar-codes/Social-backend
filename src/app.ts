import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mainRouter from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api", mainRouter);

export default app;
