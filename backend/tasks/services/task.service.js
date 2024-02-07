// task.service.js

import { Task } from "../model/task.js";

export class TaskService {

  //Add = (task) => Task.create(task);
  Add = async (task) => {
    try {
      console.log("TaskService.Add called with task:", task);
      const newTask = new Task({ ...task });
      const result = await newTask.save();
      console.log("TaskService.Add result:", result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de l'ajout de la tâche");
    }
  };

  update = async (id, item) => {
    try {
      const result = await Task.findByIdAndUpdate({ _id: id }, item);
      if (result) return this.getOne(id);
      return null;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la mise à jour de la tâche");
    }
  };

  delete = async (id) => {
    try {
      return await Task.findByIdAndDelete({ _id: id });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la suppression de la tâche");
    }
  };

  getOne = async (id) => {
    try {
      return await Task.findOne({ _id: id });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération de la tâche");
    }
  };

  getAll = async (page = 1, limit = 10, filter) => {
    try {
      if (page <= 0) page = 1;
      if (limit <= 0) limit = 10;

      const flt = {};
      if (filter) {
        if (typeof filter === "string") {
          const filters = `${filter}`.split("__");
          flt[filters[0]] = filters[1];
        } else {
          [...filter].forEach((item) => {
            const filters = `${item}`.split("__");
            flt[filters[0]] = filters[1];
          });
        }
      }

      return await Task.find(flt, {}, { limit, skip: (page - 1) * limit });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des tâches");
    }
  };
}