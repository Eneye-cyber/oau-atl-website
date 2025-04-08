import { DeleteResponse, UploadResponse } from "@/app/lib/types";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_API;
const token = process.env.NEXT_PUBLIC_UPLOAD_TOKEN;
interface UploadImageOptions {
  onProgress?: (progress: number) => void;
}

export const uploadImage = async (
  file: File,
  options?: UploadImageOptions
): Promise<UploadResponse> => {
  try {
    if (!file) {
      throw new Error("No file selected for upload.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }

    if (!baseUrl) {
      throw new Error("Image upload URL is not configured.");
    }

    if (!token) {
      throw new Error("Upload token is missing.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<UploadResponse>(
      `${baseUrl}/single`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (options?.onProgress && event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            options.onProgress(percent);
          }
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Upload error:", error);
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;
    const fallbackMessage =
      error.response?.data?.message ||
      axiosError.message || (error as Error)?.message
      "File upload failed";
    return {
      message: `${statusCode ?? 'Error'} - ${fallbackMessage}`,
      payload: {
        success: false,
        url: "",
      },
    };
  }
};

export const deleteImage = async ({
  url,
  name,
}: {
  url?: string;
  name?: string;
}): Promise<UploadResponse> => {
  try {
    if (!url && !name) {
      throw new Error("Either image URL or image name must be provided.");
    }

    if (!token) {
      throw new Error("Image server token is missing.");
    }

    if (!url && !baseUrl) {
      throw new Error("Image API base URL is not configured.");
    }

    if (url && name) {
      console.warn("Both 'url' and 'name' provided. Using 'url'.");
    }

    const endpoint = url ?? `${baseUrl}/${name}`;

    const response = await axios.delete<DeleteResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = response.data;

    return {
      message: result.message,
      payload: {
        success: true,
        url: result.payload.imageID, // assuming imageID is returned
      },
    };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;
    const statusText = axiosError.response?.statusText;
    const fallbackMessage =
      (axiosError.response?.data as any)?.message ||
      axiosError.message ||
      "Failed to delete image";

    return {
      message: `${statusCode ?? "Error"} - ${statusText || fallbackMessage}`,
      payload: {
        success: false,
        url: "",
      },
    };
  }
};
