import { create } from "zustand";
import { ConversationState } from "../types/zustand";

const selectedConversationData = sessionStorage.getItem("selectedConversation"); // set selected conversation from the local storage
const useConversation = create<ConversationState>((set) => ({
  selectedConversation: selectedConversationData
    ? JSON.parse(selectedConversationData)
    : null,
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
  setMessages: (messages) => {
    set({ messages });
  },
  viewProfile: null,
  setViewProfile: (viewProfile) => set({ viewProfile }),
}));

export default useConversation;
