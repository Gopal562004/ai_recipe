import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
  withCredentials: true,
});
// =================== Register User ===================
export async function registerUser(email: string, password: string) {
    const response = await API.post("/register", { email, password });
    return response.data;

}


// =================== Login User ===================
export const loginUser = async (email: string, password: string) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

// =================== Forgot Password (Send OTP) ===================
export const forgotPassword = async (email: string) => {
  const response = await API.post("/forgot-password", { email });
  return response.data;
};

// =================== Reset Password ===================
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const response = await API.post("/reset-password", {
    email,
    otp,
    newPassword,
  });
  return response.data;
};

// =================== Get In Touch ===================
export const getInTouch = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  const response = await API.post("/contact", {
    name,
    email,
    subject,
    message,
  });
  return response.data;
};

// =================== Get Profile ===================
export const getProfile = async (token: string) => {
  if (!token) throw new Error("No token provided");
  console.log(token);
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //console.log(response.data);
  return response.data;
};