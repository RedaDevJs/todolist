import { TaskService } from "../services/task.service.js";

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  add = (task) => this.taskService.add(task);
  update = (id, item) => this.taskService.update(id, item);
  delete = (id) => this.taskService.delete(id);
  getOne = (id) => this.taskService.getOne(id);
  getAll = (page, limit, filter) =>
      this.taskService.getAll(page, limit, filter);
}