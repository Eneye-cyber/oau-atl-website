import { toast } from "sonner"; // For notifications
const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for client-side env vars


export const signupAdmin = async (data: any): Promise<{ success: boolean; message?: string }> => {
  try {
    console.log("Processing admin signup...");

    const response = await fetch(`${baseUrl}/admins/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json().catch(() => ({ message: response.statusText }));

    if (!response.ok) {
      console.error("Signup failed:", result);
      toast.error(result?.message || "Signup failed");
      return { success: false, message: result?.message || "Signup failed" };
    }

    toast.success("Admin user created successfully");
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    toast.error("Backend error", { description: (error as Error)?.message ?? "An error occurred" });
    return { success: false, message: (error as Error)?.message };
  }
};


export const resetUserPassword = async (id: string, data: Record<string, any>) => {
  if (!baseUrl) {
    throw new Error("baseUrl environment variable is not set");
  }

  try {
    const url = `${baseUrl}/users/${id}/reset-password`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(errorDetails?.message ?? "Password reset failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred");
  }
};


export const signupUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password?: string;
  username: string;
}) => {
  try {
    if (data.password !== data.confirm_password) {
      throw new Error("Password verification failed");
    }

    const url = `${baseUrl}/users/auth/signup`;

    const requestData = { ...data, joinedFromMedia: "None" };
    delete requestData.confirm_password; // Remove `confirm_password` before sending

    // console.log("Sending Signup Request to:", url);
    // console.log("Payload:", requestData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: response.statusText,
      }));
      console.error("Signup failed:", errorResponse);
      return {result: null, error: true, message: errorResponse?.message ?? "Signup request failed", code: response.status};
    }

    const result = await response.json();
    // console.log("Signup Successful:", result);
    return {result, error: false, message: result?.message ?? "Registration successful", code: response.status};

  } catch (error) {
    console.error("Error in signup request:", error);
    return {result: null, error: true, message: (error as Error)?.message ?? "Internal Server Error", code: 500};
  }
};

export const requestPasswordReset = async ({email}: {email: string}) => {
  try {
    const url = `${baseUrl}/users/request-password`;

    // console.log("Sending Password Reset Request to:", url);
    // console.log("Email:", email);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include", // Include cookies if needed
    });

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({message: response.statusText}));
      console.error("Password request failed:", errorResponse);
      return {result: null, error: true, message: errorResponse?.message ?? "Backend Error", code: response.status};
    }

    const result = await response.json();
    // console.log("Backend Response:", result);
    return {result, error: false, message: result?.message ?? "Password changed successfully", code: response.status};
  } catch (error) {
    console.error("Error in password request:", error);
    return {result: null, error: true, message: (error as Error)?.message ?? "Internal Server Error", code: 500};
  }
};



export const logoutUser = async (userId: string, role: 'admin' | 'member' ): Promise<boolean> => {
  if (!userId) {
    toast.error("User identifier is missing.");
    return false;
  }

  try {
    // console.log("Logging out user with identifier:", userId);

    const response = await fetch(`${baseUrl}/${ role === 'admin' ? 'admins' : 'users'}/${userId}/logout`, {
      method: "POST",
      credentials: "include", // Ensure authentication cookies are included
    });

    if (!response.ok) {
      const errorMessage = await response.text().catch(() => "Logout failed");
      console.error(`Error logging out: ${response.status} - ${errorMessage}`);
      toast.error("Logout failed", { description: errorMessage });
      return false;
    }

    toast.success("Logged out successfully!");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Backend Error", { description: (error as Error)?.message || "Something went wrong" });
    return false;
  }
};
