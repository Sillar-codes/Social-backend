import mongoose from "mongoose";

import app from "./app";
import { PORT } from "./system/config";
import { MONO_URI } from "./system/config";

mongoose
  .connect(MONO_URI)
  .then(() => {
    console.log("connected to MongoDB");

    app
      .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      })
      .on("error", (error: Error) => handleUncaughtException(error));
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const handleUncaughtException = (error: Error) => {
  console.log(error);
  process.exit();
};

process.on("uncaughtException", handleUncaughtException);
