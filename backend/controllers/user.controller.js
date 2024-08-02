import User from "../db/models/user.model.js";

export const getUserForSidePanel = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find(
      { _id: userId },
      {
        chatList: 1,
      }
    );

    // const allUsers = await User.find({ _id: { $ne: userId } }, { password: 0 });
    res.status(200).json({ code: 200, data: allUsers[0].chatList });
  } catch (error) {
    console.log("get users failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};


export const getAllUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const allUsers = await User.find(
      { _id: { $ne: userId } },
      { _id: 1, fullname: 1, emailId: 1, gender: 1, createdAt: 1, profilePic:1 }
    );
    res.status(200).json({ code: 200, data: allUsers });
  } catch (error) {
    console.log("get users failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};
