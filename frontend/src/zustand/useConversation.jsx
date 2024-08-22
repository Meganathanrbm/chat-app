import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation:
    JSON.parse(sessionStorage.getItem("selectedConversation")) || null, // set selected conversation from the local storage
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation }); // selectedConversation:selectedConversation
    set({ viewProfile: null }); // reset the selected profile
    if (typeof window !== "undefined") {
      // Ensure sessionStorage availability
      sessionStorage.setItem(
        "selectedConversation",
        JSON.stringify(selectedConversation)
      );
    }
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
  viewProfile: null,
  setViewProfile: (viewProfile) => set({ viewProfile }),

}));

export default useConversation;
