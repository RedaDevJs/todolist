//taskRoute.js
import express from "express";
import { TaskController } from "./controllers/task.controller.js";
import { Task } from "./model/task.js";

export const route = express();
route.use(express.json());

const taskController = new TaskController();

// Get all tasks for a specific user
route.get("/byUserId/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await taskController.getAllByUserId(userId);

    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});
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
/*route.delete("/:id ", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskController.delete(id);
    if (result) res.status(200).json(result);
    else res.status(404).json(result);
  } catch (error) {
    console.error(res.status(500).json());
  }
});*/
route.delete("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    // Use findByIdAndDelete to find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
