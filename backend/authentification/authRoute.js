// route.js

import express from "express";
import { AuthController } from "./controllers/auth.Controller.js";

const route = express();
route.use(express.json());

const authController = new AuthController();

// Login
route.post("/login", async (req, res) => {
  try {
    const { body } = req;
    const result = await authController.login(body);
    if (result) res.status(200).json(result);
    else res.status(404).json({ message: "error" });
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
});

// Register
route.post("/register", async (req, res) => {
  try {
    const { body } = req;
    const result = await authController.register(body);
    if (result) res.status(200).json(result);
    else res.status(404).json({ msg: "erreur" });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
});

export { route };
