"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { logoutUser } from "../utils/api/auth";
import apiClient from "../apiClient";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (endpoint: string, credentials: any) => Promise<{data: any | null; error: any | null}>;
  logout: () => void;
  
}

interface User {
  email: string;
  id: string;
  role: 'member' | 'admin'
}
interface loginResult {
  message: string;
  user: User
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User| null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await apiClient.get("/auth/current");
        // console.log("User data:", response.data);

        const response = await fetch(`${baseUrl}/auth/current`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include", // Include cookies
        });
        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        console.log("data", data)
        const user = data?.user;
      if (!user) {
        throw new Error("Invalid response: No user data");
      }
      // Set user state
      setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // const login = async (endpoint: string, credentials: any) => {
  //   setLoading(true);
  //   try {
  //     console.log("Processing login...");
  
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(credentials),
  //       credentials: "include", // Ensure cookies are included
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({message: `${response.status} - ${response.statusText}`}));
  //       console.error("Login failed:", errorData);
  //       throw new Error(errorData?.message || "Login failed");
  //     }
  
  //     const data = await response.json();
  //     console.log("Login successful:", data);
  
  //     // Extract user details from the response
  //     const user = data?.user;
  //     if (!user) {
  //       throw new Error("Invalid response: No user data");
  //     }
  
  //     // Set user state
  //     setUser(user);
  //     return {data: user, error: null};
  
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setUser(null);
  //     return {data: null, error: (error as Error)?.message}
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (endpoint: string, credentials: any) => {
    setLoading(true);
    try {
      console.log("Processing login...");
  
      const response = await apiClient.post(endpoint, credentials);

      // Read response headers (optional: check Set-Cookie directive)
      const setCookieHeader = response.headers["set-cookie"];
      console.log(response.headers)
      if (setCookieHeader) {
        console.log("Set-Cookie received:", setCookieHeader);
      }
  
      console.log("Login successful:", response.data);
  
      // User data
      const user = response.data?.user;
      if (!user) {
        throw new Error("Invalid response: No user data");
      }
  
      setUser(user);
      return { data: user, error: null };
    } catch (error: any) {
      console.error("Login error:", error);
      setUser(null);
      return { data: null, error: error?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true)
    if (!user || !user.id) {
      console.error("No user found for logout.");
      setLoading(false)
      return;
    }

    const success = await logoutUser(user.id, user.role);
    if (success) {
      setUser(null);
    }
    setLoading(false)
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
