import nodemailer from "nodemailer";
import { errorMessage } from "../utils.js";

const admin = process.env.ADMIN;
const pass = process.env.PASS;

export const sendOTPTOUser = async (email, otp, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: admin,
        pass: pass,
      },
    });

    const mailOption = {
      from: admin,
      to: email,
      subject: "Forget password otp",
      html: `
      <br/>
      <hr/>
      <hr/>
      <hr/>
      <h5>  your otp for forget password : <h1> ${otp}</h1></h5>
      <hr/>
      <hr/>
      <hr/>
      <br/>
              `,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    return errorMessage(res, error);
  }
};
