import express from "express";
import { UserController } from "./controllers/user.controller.js";

export const route = express();
route.use(express.json());

const userController = new UserController();

const sanitize = (item) => {
  const { password, salt, ...user } = item;
  return user;
};
// getAll
route.get("/", async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const result = await userController.getAll(page, limit, filter);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// getOne
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userController.getOne(id);
    if (result) res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
//AddOne
route.post("/register", async (req, res) => {
  try {
    const { body } = req;
    // console.log({ body });
    const result = await userController.Add(body);
    if (result) res.status(201).json(sanitize(result));
    else res.status(404).json({ msg: "erreur" });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
});

//updateOne
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await userController.update(id, body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (err) {
    console.error(res.status(500).json(err));
  }
});

//delete
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userController.delete(id);
    if (result) res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
