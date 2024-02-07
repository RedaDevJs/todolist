// task.controller.js

import { TaskService } from "../services/task.service.js";
import {UserService} from "../../users/services/user.service.js";

export class TaskController {

  constructor() {
    this.taskService = new TaskService();
  }
  add = (task) => this.taskService.add(task);
  update = (task) => this.taskService.update(task);

  /*update = async (id, item) => {
    try {
      const result = await this.taskService.update(id, item);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }
  };*/

  delete = async (id) => {
    try {
      return await this.taskService.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la suppression de la tâche");
    }
  };

  getOne = async (id) => {
    try {
      return await this.taskService.getOne(id);
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération de la tâche");
    }
  };

  getAll = async (req, res) => {
    try {
      const { page, limit, filter } = req.query;
      const result = await this.taskService.getAll(page, limit, filter);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Ressources non trouvées" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  };
}
