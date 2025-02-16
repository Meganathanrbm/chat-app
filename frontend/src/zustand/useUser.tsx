import { create } from "zustand";
import { UserState } from "../types/zustand";


const useUser = create<UserState>((set) => ({
  // for user email verifications
  isVerify: false,
  emailId: "",
  setEmailID: (emailId) => set({ emailId }),
  setIsVerify: (isVerify) => set({ isVerify }),
}));

export default useUser;
