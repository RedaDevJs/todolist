import express from "express";
import { TaskController } from "./controllers/task.controller.js";

export const route = express();
route.use(express.json());

const taskController = new TaskController();

// Add Task
route.post("/", async (req, res) => {
  try {
    const { body } = req;
    console.log({ body });
    const result = await taskController.Add(body);
    if (result) {
      res.status(201).json(result);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Update Task
route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await taskController.update(id, body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Delete Task
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskController.delete(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Get One Task
route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskController.getOne(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ressource non trouvée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Get All Tasks
route.get("/", async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const result = await taskController.getAll(page, limit, filter);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ressources non trouvées" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});
