import express from "express";
import { AuthController } from "./controllers/aut.controller";

export const route = express();
route.use(express.json());

const authController = new AuthController();

route.post("/", async (req, res) => {
  try {
    const { body } = req;
    const result = await this.authController.login(body);
    if (result) res.status(200).json(result);
    else res.status(404).json({ message: "error" });
  } catch (error) {
    res.status(500).json();
  }
});

//RegisterOne
route.post("/register", async (req, res) => {
  try {
    const { body } = req;
    // console.log({ body });
    const result = await authController.register(body);
    if (result) res.status(200).json(result);
    else res.status(404).json({ msg: "erreur" });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
});
