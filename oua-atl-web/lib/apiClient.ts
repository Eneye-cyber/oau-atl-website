// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "",
  withCredentials: true, // Automatically include cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptor for debugging cookies
apiClient.interceptors.request.use((config) => {
  // console.log("Sending request with cookies:", document.cookie);
  if(document.cookie) {
    console.log('auth')
  }
  return config;
});

export default apiClient;
