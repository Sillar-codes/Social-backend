import { configDotenv } from "dotenv";

configDotenv();

export const PORT = process.env.PORT || 3000;
export const MONO_URI: string =
  process.env.MONO_URI ||
  "mongodb+srv://Sillar:sillarmongodb123@clusters.dobhwv2.mongodb.net/?retryWrites=true&w=majority&appName=ClusterS";
export const JWT_SECRET: string = process.env.JWT_SECRET || "sillarcode";

export const SCHEMA_NAMES = {
  user: "users",
  post: "posts",
};
