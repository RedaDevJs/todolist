// userService.test.js

// Import the UserService class
import { UserService } from "../services/user.service.js";

// Mock Mongoose and User model
jest.mock("mongoose");
jest.mock("../model/user.js", () => ({
  User: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  },
}));

// Describe block for UserService tests
describe("UserService", () => {
  // Test suite for Add method
  describe("Add method", () => {
    it("should add a new user to the database", async () => {
      // Mock user data
      const userData = {
        email: "test@example.com",
        name: "Test User",
        password: "password123",
      };

      // Mock instance of UserService
      const userService = new UserService();

      // Mock the return value of save method of User model
      userService.collection.save.mockResolvedValue(userData);

      // Call the Add method of UserService
      const addedUser = await userService.Add(userData);

      // Check if the user was added successfully
      expect(addedUser).toEqual(userData);
    });
  });

  // Other test suites for other methods like update, getOne, delete, and getAll can be added similarly.
});
