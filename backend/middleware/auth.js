import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("Token received:", token); // DEBUG

  if (!token) {
    return next(new ErrorHandler("Please Login to access Resource", 401));
  }

  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;

  const decodedData = jwt.verify(token, secret);

  const user = await User.findById(decodedData.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  req.user = user;

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
