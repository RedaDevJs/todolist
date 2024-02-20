import { User } from "../model/user.js";
import { Task } from "../../tasks/model/task.js"; // Corrected import

export class UserService {
  add = (user) => User.create(user);
  update = (id, item) => User.findByIdAndUpdate(id, item, { new: true });
  getOne = (id) => User.findById(id);
  delete = (id) => User.findByIdAndDelete(id);

  getAll = async (page = 1, limit = 100, filter) => {
    try {
      page = Math.max(1, page);
      limit = Math.max(1, limit);

      const query = {};

      if (filter) {
        if (typeof filter === "string") {
          const [key, value] = filter.split("__");
          query[key] = value;
        } else if (Array.isArray(filter)) {
          filter.forEach((item) => {
            const [key, value] = item.split("__");
            query[key] = value;
          });
        }
      }

      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

      return users;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
  };

  findByParams(params, value) {
    return User.findOne({ [params]: value });
  }
}
