import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
} from "../utils/checkAuth.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      createError({
        message: "Email & password are required",
        statusCode: 400,
      })
    );
  }

  try {
    const user = await AdminUser.findOne({ email: email });

    if (user) {
      return next(
        createError({ status: 404, message: "Email is already exits!" })
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new AdminUser({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "New User Created" });
  } catch (err) {
    return next(
      createError({
        message: "Internal Server Error",
        statusCode: 500,
      })
    );
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createError({
        message: "Email and password are required",
        statusCode: 500,
      })
    );
  }

  try {
    const user = await AdminUser.findOne({ email: email });

    if (!user) {
      return next(
        createError({ status: 404, message: "User not found with the email" })
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(
        createError({ status: 400, message: "Password is incorrect" })
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    return res.status(200).json({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      message: "You logged in successfully!",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    createError({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  const refreshTokenIndex = refreshTokens.indexOf(refreshToken);
  // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  refreshTokens.splice(refreshTokenIndex, 1);
  res.status(200).json({ message: "You logged out successfully!" });
};

export const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  const refreshTokenIndex = refreshTokens.indexOf(refreshToken);

  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    refreshTokens.splice(refreshTokenIndex, 1);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};
