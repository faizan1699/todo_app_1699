import { User } from "../../schema/usersSchema.js";
import { validateReqFields } from "../../utils/check_req_fields.js";
import { observer } from "../../utils/observer.js";
import { Pagination } from "../../utils/pagination.js";
import { errorMessage } from "../../utils/utils.js";
import bcrypt from "bcryptjs";

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

export const updatePassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const isValidate = validateReqFields(req.body, [
      "old_password",
      "new_password",
      "confirm_password",
    ]);
    if (!isValidate.success) {
      return res.status(400).json({ message: isValidate.message });
    }

    if (new_password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "password not match", status: false });
    }

    const x = await observer(req, res);
    if (!x) {
      return res.status(401).json({ message: "Unauthorized", status: false });
    }
    const user = await User.findById(x.id).select("+password");
    if (!user) {
      return res.status(200).json({ message: "user not found", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    const isValidPassword = await bcrypt.compare(old_password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "wrong password",
        status: false,
      });
    }

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "password updated successfully",
      status: true,
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};
