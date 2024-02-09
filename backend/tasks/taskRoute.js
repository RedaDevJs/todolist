//taskRoute.js
import express from "express";
import { TaskController } from "./controllers/task.controller.js";

export const route = express();
route.use(express.json());

const taskController = new TaskController();

//addTask
route.post("/", async (req, res) => {
  try {
    const { body } = req;
    console.log({ body });
    const result = await taskController.add(body);
    console.log(body);
    if (result) res.status(201).json(result);
    res.status(404).json();
  } catch (error) {
    console.error(res.status(500).json());
  }
});

//updateTask
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await taskController.update(id, body);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});
//delete
route.delete("/:id ", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskController.delete(id);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});

//getOne
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskController.getOne(id);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});

//getAll
route.get("/", async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const result = await taskController.getAll(page, limit, filter);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});
