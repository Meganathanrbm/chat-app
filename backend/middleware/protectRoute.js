import jwt from "jsonwebtoken";
import User from "../db/models/user.model.js";

// route level middleware
const protectRoute = async (req, res, next) => {
  try {
    // get the jwt from the cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(404).json({ code: 404, error: "Unauthorized User!" });
    }
    // decode the cookies
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(404).json({ code: 404, error: "Unauthorized User!" });
    }
    // find the user by using userID decoded from the cookies
    const user = await User.findById(decode.user);
    if (!user) {
      return res.status(404).json({ code: 404, error: "No user find!" });
    }
    // set the user to res
    req.user = user;
    //  run next
    next();
  } catch (error) {
    console.log("protect route", error);
    res.status(500).json({ code: 500, error: "Internal Server Error!" });
  }
};

export default protectRoute;
