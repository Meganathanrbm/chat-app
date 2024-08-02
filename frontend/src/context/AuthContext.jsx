import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, darkToggle, setDarkToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
