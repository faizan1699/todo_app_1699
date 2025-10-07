import { User } from "../../schema/usersSchema.js";
import { Pagination } from "../../utils/pagination.js";
import { errorMessage } from "../../utils/utils.js";
import mongoose from "mongoose";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(200).json({ message: "no user found", status: false });
    }
    const data = await Pagination(User, req);
    return res.status(200).json({ message: "", status: true, data });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ user_id: id });
    }

    if (!user) {
      return res.status(200).json({ message: "no user found", status: false });
    }
    return res.status(200).json({ message: "", status: true, user });
  } catch (error) {
    return errorMessage(res, error);
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findByIdAndDelete(id);
    } else {
      user = await User.findOneAndDelete({ user_id: id });
    }

    if (!user) {
      return res.status(200).json({ message: "no user found", status: false });
    }
    return res
      .status(200)
      .json({ message: "user deleted successfully", status: true });
  } catch (error) {
    return errorMessage(res, error);
  }
};
