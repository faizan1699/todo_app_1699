import { Todos } from "../../schema/todoSchema.js";
import { validateReqFields } from "../../utils/check_req_fields.js";
import { observer } from "../../utils/observer.js";
import { Pagination } from "../../utils/pagination.js";
import { errorMessage } from "../../utils/utils.js";
import mongoose from "mongoose";

export const getAllTodos = async (req, res) => {
  try {
    const reqBody = req.json();
    const data = await observer(req, res);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }

    const todos = await Todos.find({ user_id: data.user_id });

    if (!todos.length) {
      return res
        .status(200)
        .json({ message: "Todos not found", status: false });
    }

    const paginatedData = await Pagination(Todos, req, {
      user_id: data.user_id,
    });

    return res.status(200).json({
      message: "Todos fetched successfully",
      status: true,
      data: paginatedData,
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, details, is_completed, user_id, deadline, priority } =
      req.body;

    const isValidate = validateReqFields(req.body, [
      "title",
      "details",
      "is_completed",
    ]);

    if (!isValidate.success) {
      return res.status(400).json({ message: isValidate.message });
    }

    const data = await observer(req, res);

    const isTodo = await Todos.findOne({ title: title, user_id: data.user_id });
    if (isTodo) {
      return res
        .status(200)
        .json({ message: "title already taken", status: false });
    }

    const newTodo = new Todos({
      title,
      details,
      is_completed,
      user_id: data.user_id,
      deadline,
      priority,
    });

    await newTodo.save();
    return res
      .status(200)
      .json({ message: "todo created successfully", status: true, newTodo });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, details, is_completed, deadline, priority } = req.body;
    const allowedUpdates = [title, details, is_completed, deadline, priority];
    const updates = Object.keys(req.body);
    const isValid = updates.every((key) => allowedUpdates.includes(key));

    if (!isValid) {
      return res.status(422).json({
        error: "field not allowed to update , pls check",
        status: false,
      });
    }
    const x = await observer(req, res);
    if (!x) {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }

    const data = await Todos.findById(id);
    if (data.user_id != x.user_id) {
      return res.status(200).json({ message: "data not found", status: true });
    }

    const response = await Todos.findByIdAndUpdate(id, {
      title,
      details,
      is_completed,
      deadline,
      priority,
    });

    return res.status(200).json({
      message: "Todo Updated",
      status: true,
      response,
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getUTodoByID = async (req, res) => {
  try {
    const { id } = req.params;

    const x = await observer(req, res);
    if (!x) {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }

    const data = await Todos.findById(id);

    if (data.user_id != x.user_id) {
      return res.status(200).json({ message: "data not found", status: true });
    }

    return res.status(200).json({ message: "", status: true, data });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const deleteTodoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const x = await observer(req, res);
    if (!x) {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }
    const data = await Todos.findById(id);
    if (data.user_id != x.user_id) {
      return res.status(200).json({ message: "data not found", status: true });
    }
    await Todos.findByIdAndDelete(id);

    return res.status(200).json({ message: "Todo Deleted", status: true });
  } catch (error) {
    return errorMessage(res, error);
  }
};
