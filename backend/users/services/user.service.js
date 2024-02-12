//user.service.js

import {User} from "../model/user.js";

export class UserService {

    add = (user) => User.create(user);
    update = (id, item) => User.findByIdAndUpdate(id, item, {new: true});
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
        return User.findOne({[params]: value});
    }
}

/*async add(username, email, password, role) {
    try {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new User instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      console.log("User added successfully:", savedUser);
      return savedUser;
    } catch (error) {
      console.error("Error adding user:", error.message);
      throw error;
    }
  }*/