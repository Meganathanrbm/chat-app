import jwt from "jsonwebtoken";

const generateJWTandSetCookie = (user, res) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF- cross side request forgery attack
    secure: process.env.NODE_ENV === "pro", //! true in production
  });
};

export default generateJWTandSetCookie;
