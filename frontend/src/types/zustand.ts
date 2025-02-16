import { UserBaseType } from ".";

export interface UserState {
    isVerify: boolean;
    emailId: string;
    setEmailID: (emailId: string) => void;
    setIsVerify: (isVerify: boolean) => void;
  }
  
export interface ConversationState {
    selectedConversation: SelectedConversation | null;
    setSelectedConversation: (selectedConversation: UserBaseType | null) => void;
    messages: MessageState[];
    setMessages: (message: MessageState[]) => void;
    viewProfile: ViewProfile | null;
    setViewProfile: (viewProfile: ViewProfile | null) => void;
  }



export type SelectedConversation = Omit<UserBaseType,"mobile">
export type ViewProfile = UserBaseType 

export type MessageState = {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    seen: boolean;
    createdAt: string;
    updatedAt: string;
  };


  