import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { errorMessage } from "./utils.js";
import { User } from "../schema/usersSchema.js";

const admin = process.env.ADMIN;
const pass = process.env.PASS;
const DOMAIN = process.env.DOMAIN;
const secretKey = process.env.JWT_SECRET;

export const sendVerificationEmail = async (email, res) => {
  try {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const emailverificationtoken = jwt.sign(email, secretKey);

    const updateFields = {
      email_verify_token: emailverificationtoken,
    };

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "user not exist", status: false });
    }

    const name = await user.name;

    Object.assign(user, updateFields);
    await user.save();

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
      subject: "Verify Your Email",
      html: `
 <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #4338ca; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px; padding: 20px;">
                            <img src={https://cdn.shopify.com/app-store/listing_images/46efa3dae66c435783fbe94c2ab48cd4/promotional_image/CKOD6K7QxogDEAE=.jpeg?height=720&quality=90&width=1280} alt="My Chat Logo" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="font-size: 24px; margin-top: 0; color: #4338ca; font-weight: bold;">Hello ${name},</h2>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for signing up for MY CHAT! To complete your registration and activate your account, please verify your email address by clicking the button below.</p>
                            <a href="${DOMAIN}/verifyemail?token=${emailverificationtoken}" style="display: inline-block; padding: 12px 25px; font-size: 16px; color: #ffffff; background-color: #4338ca; text-decoration: none; border-radius: 5px; margin-top: 10px; font-weight: bold;">Verify Email</a>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">Or copy and paste this link into your browser:</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0; word-break: break-word;">${DOMAIN}/verifyemail?token=${emailverificationtoken}</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">If you did not create an account with MY CHAT, please ignore this email.</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">If you have any questions or need further assistance, feel free to contact our support team.</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0 0;">Thank you for joining us!</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Best regards,<br>The MY CHAT Team</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #4338ca; color: #ffffff; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; padding: 20px;">
                            <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} MY CHAT. All rights reserved.</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
              `,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    return errorMessage(res, error);
  }
};
