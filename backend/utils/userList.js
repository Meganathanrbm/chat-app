export const userList = {};

export const fetchUsers = async (users) => {
  users.map((user) => (userList[user._id] = user));
};
