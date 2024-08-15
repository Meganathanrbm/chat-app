import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatContainer from "../pages/home/ChatContainer";

// Mock the ChatHeader and ChatList components
jest.mock("../components/chatContainer/ChatHeader", () => {
  return () => <div>Chat Header</div>;
});

jest.mock("../components/chatContainer/ChatList", () => {
  return () => <div>Chat List</div>;
});

test("renders ChatContainer with ChatHeader and ChatList", () => {
  render(<ChatContainer />);

  const hrElement = screen.getByRole("separator");
  expect(hrElement).toBeInTheDocument();
});
