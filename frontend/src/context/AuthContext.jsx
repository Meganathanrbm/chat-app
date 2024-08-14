import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [darkToggle, setDarkToggle] = useState(() => {
    const storedPreference = localStorage.getItem("dark-mode");
    if (storedPreference !== null) {
      return storedPreference === "true";
    }
    // If no preference is stored, use system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, darkToggle, setDarkToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
