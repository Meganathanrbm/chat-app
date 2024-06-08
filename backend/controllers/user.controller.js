import User from "../db/models/user.model.js";

export const getUserForSidePanel = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: userId } }, { password: 0 });
    res.status(200).json({ code: 200, data: allUsers });
  } catch (error) {
    console.log("get users failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};
