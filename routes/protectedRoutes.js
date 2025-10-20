import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updatePassword,
} from "../controllers/private/userController.js";
import {
  createTodo,
  deleteTodoByID,
  getAllTodos,
  getUTodoByID,
  updateTodoById,
} from "../controllers/private/todosControllers.js";

const protectedRoutes = express.Router();
// users route
protectedRoutes.get("/users/listing", getUsers);
protectedRoutes.get("/user/get/:id", getUserById);
protectedRoutes.delete("/user/delete/:id", deleteUserById);

protectedRoutes.get("/todos/listing", getAllTodos);
protectedRoutes.post("/todos/create", createTodo);
protectedRoutes.get("/todos/get/:id", getUTodoByID);
protectedRoutes.delete("/todos/delete/:id", deleteTodoByID);
protectedRoutes.put("/todos/update/:id", updateTodoById);

protectedRoutes.put("/user/auth/update/password", updatePassword);

export default protectedRoutes;
