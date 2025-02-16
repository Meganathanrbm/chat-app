import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.js";
import { SocketContextProvider } from "./context/SocketContext.js";

const root =
  document.getElementById("root") ||
  Object.assign(document.createElement("div"), { id: "root" });

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
