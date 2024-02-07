//user.service.js

import { User } from '../model/user.js';

export class UserService {
  Add = (user) => User.create(user);
  update = (id, item) => User.findByIdAndUpdate(id, item, { new: true });
  getOne = (id) => User.findById(id);
  delete = (id) => User.findByIdAndDelete(id);
  getAll = (page = 1, limit = 10, filter = {}) => {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    return User.paginate(filter, options);
  };
  findByParams(params, value) {
    return User.findOne({ [params]: value });
  }
}
