import { create } from "zustand";

const useUser = create((set) => ({
  // for user email verifications
  isVerify: false,
  emailId: "",
  setEmailID: (emailId) => set({ emailId }),
  setIsVerify: (isVerify) => set({ isVerify }),
}));

export default useUser;
