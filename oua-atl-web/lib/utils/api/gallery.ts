const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Use NEXT_PUBLIC_ for client-side access
export const submitGalleryForm = async (formData: Record<string, any>) => {
  if (!baseUrl) {
    throw new Error("API base URL is not set.");
  }

  try {
    console.log("Processing Gallery form...");

    const url = `${baseUrl}/gallery`;
    console.log("Sending form request to:", url);
    console.log("Transformed data:", formData);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include", // Ensures cookies are sent if necessary
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from API: ${response.status} - ${errorText}`);
      throw new Error(errorText || "Failed to submit the gallery form.");
    }

    const result = await response.json();
    console.log("Backend response:", result);

    return result;
  } catch (error: any) {
    console.error("Client fetch error:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};

export const updateGalleryItem = async (id: string, formData: Record<string, any>) => {
  if (!baseUrl) {
    throw new Error("API base URL is not set.");
  }

  try {
    console.log("Processing Gallery update...");

    const url = `${baseUrl}/gallery/${id}`;
    console.log("Sending update request to:", url);
    console.log("Updated data:", formData);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include", // Ensures cookies are sent if necessary
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({
        message: response.statusText,
      }));
      console.error(`Error from API: ${response.status} - ${errorDetails.message}`);
      throw new Error(errorDetails.message || "Failed to update gallery item.");
    }

    const result = await response.json();
    console.log("Backend response:", result);

    return result;
  } catch (error: any) {
    console.error("Client fetch error:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
