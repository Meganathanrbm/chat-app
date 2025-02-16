// Login 
export interface LoginFormData {
    emailId: string;
    password: string;
  }

// Forget password
export interface ForgetPasswordData {
    emailId: string;
  }

// Reset password 
export interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

// Signup form 2
export interface SignUpScreen2Data {
  fullname: string;
  mobile: number;
  gender: string;
  emailId: string;
}

// sign up form 1
export interface SignUPform1Data {
  emailId: string;
  password: string;
  confirmPassword: string;
}

