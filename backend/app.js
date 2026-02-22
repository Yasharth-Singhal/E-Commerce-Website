import express from "express";
import product from "./routes/productRoute.js";
import errorHandler from "./middleware/error.js";
import user from "./routes/userRoute.js";
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieParser());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/v1", product);
app.use("/api/v1", user);

// Fallback 404 handler with helpful message
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

export default app;
