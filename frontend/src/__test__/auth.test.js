import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/auth/Login";
import useLogIn from "../hooks/useLogIn";
import { AuthContext } from "../context/AuthContext";

import "@testing-library/jest-dom";

// Mock the useLogIn hook
jest.mock("../hooks/useLogIn");

test("renders the login form correctly", () => {
  // Mock context value
  const mockSetAuthUser = jest.fn();
  const mockLogin = jest.fn();

  // Mock the useLogIn hook's return values
  useLogIn.mockReturnValue({
    loading: false,
    login: mockLogin,
  });

  // Render the component
  render(
    <AuthContext.Provider value={{ setAuthUser: mockSetAuthUser }}>
      <Router>
        <Login />
      </Router>
    </AuthContext.Provider>
  );
  expect(screen.getAllByText("Login").length).toBe(2);
  // Check if the input is rendered
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  // Check if the login button is rendered
  expect(screen.getByRole("button")).toBeInTheDocument();
});
