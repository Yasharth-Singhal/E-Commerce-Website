import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

//Handling Uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the Server due to uncaught Exception`);
  process.exit(1);
});

dotenv.config();

// console.log("MONGO_URI:", process.env.MONGO_URI);

const server = app.listen(process.env.PORT, () => {
  connectDatabase();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the Server due to unhandles promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
