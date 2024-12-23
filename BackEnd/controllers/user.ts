import db from "../config/db";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default {
  register: async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const existingUser = await db.user.findUnique({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        return res.status(409).json({ message: "Username is already taken." });
      }

      const newUser = await db.user.create({
        data: {
          username: username,
          password: password,
        },
      });

      return res.status(201).json({
        message: "User registered successfully.",
        user: {
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while registering." });
    }
  },

  login: async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const result = await db.user.findFirst({
        where: {
          username: username,
        },
      });

      if (!result) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = result.password == password;
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const token = jwt.sign(
        { userId: result.id, username: result.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful.",
        username: username,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while logging in." });
    }
  },
};
