import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation:
    JSON.parse(localStorage.getItem("selectedConversation")) || null, // set selected conversation from the local storage
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation }); // selectedConversation:selectedConversation
    if (typeof window !== "undefined") {
      // Ensure localStorage availability
      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(selectedConversation)
      );
    }
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
