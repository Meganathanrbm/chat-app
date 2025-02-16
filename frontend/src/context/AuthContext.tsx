import { createContext, ReactNode, useState } from "react";
import { UserBaseType } from "../types";
import {
  AuthContextProviderPropsType,
  AuthContextType,
} from "../types/context";

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  darkToggle: false,
  setDarkToggle: () => {},
});

export const AuthContextProvider = ({
  children,
}: AuthContextProviderPropsType) => {
  const [authUser, setAuthUser] = useState<UserBaseType | null>(() => {
    const chatUser = localStorage.getItem("chat-user");
    return chatUser ? JSON.parse(chatUser) : null;
  });
  const [darkToggle, setDarkToggle] = useState<boolean>(() => {
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
