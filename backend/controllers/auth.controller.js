import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../db/models/user.model.js";
import generateJWTandSetCookie from "../utils/generateJWTandSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { fullname, mobile, emailId, password, confirmPassword, gender } =
      req.body;

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ code: 400, error: "Confirm password doesn't match!" });
    }
    // if user already exist return
    const user = await User.find({ emailId: emailId });
    if (user.length) {
      return res.status(400).json({ code: 400, error: "User already exist!" });
    }

    //  profile picture
    const boy = "https://avatar.iran.liara.run/public/boy?username=" + emailId;
    const girl =
      "https://avatar.iran.liara.run/public/girl?username=" + emailId;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // for side panel user profile list
    const allUsers = await User.find(
      {},
      {
        _id: 1,
        fullname: 1,
        profilePic: 1,
        createdAt: 1,
        gender: 1,
        emailId: 1,
      }
    );

    const newUser = new User({
      fullname,
      mobile,
      emailId,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boy : girl,
      chatList: allUsers,
    });

    if (newUser) {
      // JWT - for authorization
      generateJWTandSetCookie(newUser._id, res);

      await newUser.save();
      return res.status(201).json({
        code: 201,
        data: {
          _id: newUser._id,
          fullname: newUser.fullname,
          mobile: newUser.mobile,
          emailId: newUser.emailId,
          profilePic: newUser.profilePic,
          gender: newUser.gender,
          createdAt: newUser.createdAt,
        },
        message: "Signup success!",
      });
    } else {
      return res.status(400).json({ code: 400, error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log("signup failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};

export const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!user || !passwordMatch) {
      return res
        .status(500)
        .json({ code: 500, error: "Invalid username or password." });
    }

    generateJWTandSetCookie(user._id, res);
    res.status(200).json({
      code: 200,
      data: {
        _id: user._id,
        fullname: user.fullname,
        mobile: user.mobile,
        emailId: user.emailId,
        profilePic: user.profilePic,
        gender: user.gender,
        createdAt: user.createdAt,
      },
      message: "Login success!.",
    });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(200)
      .json({ code: 200, message: "logout success." });
  } catch (error) {
    console.log("Logout failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).json({ code: 404, error: "user not found!" });
    }
    // generate token for more secure
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 2 * 60 * 60 * 1000; // expire after 1 hour
    await user.save();
    // for send reset password email send.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "meganathan.m8n@gmail.com",
        pass: "eaxdzutyhkrncqeb",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/auth/resetPassword/${token}`;
    const emailOptions = {
      from: "chat-app@gmail.com",
      to: emailId,
      subject: "Chat App Reset Password!.",
      html: `
        <p>Hello, ${user.fullname}</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Regards,</p>
        <p>Chat-App.</p>
      `,
    };
    transporter.sendMail(emailOptions, (err) => {
      if (err) {
        console.log("Forget Password  failed", err);
        return res.status(500).json({
          code: 500,
          error: "Internal Server Error ",
        });
      }
      return res.status(200).json({
        code: 200,
        message: "Forget Password mail sent!.",
      });
    });
  } catch (error) {
    console.log("Forget Password  failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // search user who satisfy token and expires.
    const user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    // if user doesnt exist
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, error: "Password reset is expired! or Invalid." });
    }
    const { password, confirmPassword } = req.body;

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ code: 400, error: "Confirm password doesn't match!" });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.password = hashedPassword;
    generateJWTandSetCookie(user._id, res);
    await user.save();
    return res
      .status(200)
      .json({ code: 200, message: "password updated successfully!" });
  } catch (error) {
    console.log("Reset Password  failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
