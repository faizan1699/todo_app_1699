import { validateReqFields } from "../utils/check_req_fields.js";
import { generateOTP } from "../utils/utils.js";
import bcrypt from "bcryptjs";
import { errorMessage } from "../utils/utils.js";
import { sendVerificationEmail } from "../utils/nodemailer.js";
import { User } from "../schema/usersSchema.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    const isValidate = validateReqFields(req.body, [
      "name",
      "email",
      "password",
      "confirm_password",
    ]);

    if (!isValidate.success) {
      return res.status(400).json({ message: isValidate.message });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "password not match." });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(201)
        .json({ message: "User already / exists", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const id = generateOTP(4);
    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      user_id: id,
    });
    await newUser.save();
    await sendVerificationEmail(email, res);

    return res.status(200).json({
      message:
        "User registered successfully , an account verification link has been sent to your email.",
      status: true,
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    const isValidate = validateReqFields(req.body, [
      "email",
      "password",
      "confirm_password",
    ]);
    if (!isValidate.success) {
      return res
        .status(400)
        .json({ message: isValidate.message, status: false });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ message: "password not match." });
    }

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found, please register.", status: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", status: false });
    }

    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      user_id: user.user_id,
      is_verified: user.is_verified,
    };

    if (!user.is_verified) {
      return res.status(200).json({
        message: "Your email is not verified",
        status: false,
      });
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      status: true,
      user: data,
      token,
    });
  } catch (error) {
    return errorMessage(res, error);
  } finally {
    console.log("login api called");
  }
};

export const verifyUserEmailAccount = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(400).json({ message: "token is required" });
    }
    const email = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email });
    console.log(user.email_verify_token, token);
    if (user.email_verify_token !== token) {
      {
        return res
          .status(400)
          .json({ message: "Invalid or expired token", status: false });
      }
    }
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    if (user.is_verified) {
      return res
        .status(200)
        .json({ message: "User already verified", status: true });
    }

    await User.updateOne(
      { email: email },
      {
        $set: { is_verified: true },
        $unset: { email_verify_token: "" },
      }
    );
    return res
      .status(200)
      .json({ message: "email verified succesfully", status: true });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const resendVerificationLink = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    if (user.is_verified) {
      return res
        .status(200)
        .json({ message: "User already verified", status: true });
    }
    await sendVerificationEmail(email, res);
    return res
      .status(200)
      .json({ message: "Verification link sent to your email", status: true });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Logout successfully", status: true });
  } catch (error) {
    return errorMessage(res, error);
  }
};
