import { ReactNode } from "react";
import { UserBaseType } from ".";
import { Socket } from "socket.io-client";
import { MessageState } from "./zustand";

export interface AuthContextType {
  authUser: UserBaseType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserBaseType | null>>;
  darkToggle: boolean;
  setDarkToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AuthContextProviderPropsType = {
  children: ReactNode;
};

// Socket Context types 
export interface SocketContextProviderTy {
  socket: Socket<ServerToClientEvents> | null;
  onlineUsers: string[];
}
export interface ServerToClientEvents {
  getOnlineUsers: (users: string[]) => void;
  close: () => void;
  newChatList:(conversation: UserBaseType[])=> void
  newMessage:(message: MessageState)=> void
}