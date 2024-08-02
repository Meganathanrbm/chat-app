import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthContext } from "./context/AuthContext";
import { useWidth } from "./hooks/useWidth";

import Login from "./pages/auth/Login";
import Auth from "./pages/auth";
import Home from "./pages/home";
import SignUp from "./pages/auth/SignUp";
import { MessageContainer } from "./pages/home/MessageContainer";
import ChatContainer from "./pages/home/ChatContainer";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { Profile } from "./components/profile/Profile";

function App() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const width = useWidth();

  return (
    <main className="h-screen w-screen center ">
      <div className="">
        <Toaster position="top-center" className="z-50" reverseOrder={false} />
      </div>

      <Routes>
        {/* Auth router */}
        {/* if the user exist, redirect to home otherwise auth route */}
        <Route path="/auth" element={authUser ? <Navigate to="/" /> : <Auth />}>
          <Route path="signup" element={<SignUp />} />
          <Route index path="login" element={<Login />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
        </Route>

        {/* for large devices */}
        {!width && (
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/auth/login" />}
          />
        )}

        {/* for small devices */}
        {width && (
          <>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<ChatContainer />} />
              <Route
                path="/conversation/:name"
                element={<MessageContainer />}
              />
              <Route path="/profile/:name" element={<Profile />} />
            </Route>
          </>
        )}

        <Route
          path="*"
          element={
            authUser ? <Navigate to="/" /> : <Navigate to="/auth/login" />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
