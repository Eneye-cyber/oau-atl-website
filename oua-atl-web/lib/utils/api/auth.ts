const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for client-side env vars

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