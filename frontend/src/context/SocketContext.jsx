import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-app-mkum.onrender.com", {
        // send the connected user to the backend using query
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      //   socket.on() is used to listen to the events
      socket.on("getOnlineUsers", (users) => setOnlineUsers(users));
      //   close the socket connection for cleanup function
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
