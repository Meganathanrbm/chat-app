import User from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWTandSetCookie from "../utils/generateJWTandSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ code: 400, error: "Confirm password doesn't match!" });
    }
    // if user already exist return
    const user = await User.find({ username: username });
    if (user.length) {
      return res.status(400).json({ code: 400, error: "User already exist!" });
    }

    //  profile picture
    const boy = "https://avatar.iran.liara.run/public/boy?username=" + username;
    const girl =
      "https://avatar.iran.liara.run/public/girl?username=" + username;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boy : girl,
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
          username: newUser.username,
          profilePic: newUser.profilePic,
          gender: newUser.gender,
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
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    const passwordMatch = await bcrypt.compare(password, user?.password || "");
    if (!user || !passwordMatch) {
      return res
        .status(500)
        .json({ code: 500, error: "Invalid username or password." });
    }

    generateJWTandSetCookie(user._id, res);
    res.status(200).json({ code: 200, message: "Login success!." });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .cookie("jwt","", { maxAge: 0 })
      .status(200)
      .json({ code: 200, message: "logout success." });
  } catch (error) {
    console.log("Logout failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error " });
  }
};
