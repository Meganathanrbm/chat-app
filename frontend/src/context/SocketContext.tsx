import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import {
  ServerToClientEvents,
  SocketContextProviderTy,
} from "../types/context";

export const SocketContext = createContext<SocketContextProviderTy>({
  socket: null,
  onlineUsers: [],
});

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents> | null>(
    null
  );
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      // https://chat-app-mkum.onrender.com
      const socket: Socket = io("http://localhost:8000", {
        // send the connected user to the backend using query
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);
      //   socket.on() is used to listen to the events
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      //   close the socket connection for cleanup function
      return () => socket.close();
    } else {
      return () => {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
