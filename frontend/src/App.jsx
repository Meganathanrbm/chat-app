import { useContext, useState } from "react";
import Login from "./pages/auth/Login";
import Auth from "./pages/auth";
import Home from "./pages/home";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  return (
    <main className="h-screen w-screen center ">
      <div className="">
        <Toaster position="top-center" className="z-50" reverseOrder={false} />
      </div>

      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route
            path="signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            index
            path="login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
        </Route>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </main>
  );
}

export default App;
