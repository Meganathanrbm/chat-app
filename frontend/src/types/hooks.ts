import { UserBaseType } from "."

// useForgetPassword 
export interface APIResponse {
  message: string
  error?:string
  data?: UserBaseType[]
}
// use update profile 
export interface useUpdateProfileAboutProps {
  setIsAboutEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

// UseGetConversation

// Response 
export interface APIResponseTy<T> {
  code:number
  data?: T
  error?:string
  message?:string
}
export interface EmailData {
  emailId: string;
}