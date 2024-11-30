'use client';
import { InputHTMLAttributes, useState, forwardRef } from "react";
import { useFormContext } from "react-hook-form"; // Import form context

const ImageUploader = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const [fileName, setFileName] = useState<string>(""); // Stores the file name
  const [fileUrl, setFileUrl] = useState<string>(""); // Stores the file URL
  const [isUploading, setIsUploading] = useState(false); // Tracks upload state

  const { setValue } = useFormContext(); // Access React Hook Form's setValue function

  const uploadFile = async (file: File) => {
    const url = `/api/image`; // Replace with your actual fetch URL
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData, // No need for 'Content-Type', FormData sets it automatically
      });

      if (!response.ok) {
        throw new Error("File upload failed!");
      }

      const data = await response.json();
      if (data.payload.success) {
        setFileName(data.payload.fileName); // Set the file name
        setFileUrl(data.payload.url); // Set the file URL
        setValue(props.name || "imageUrl", data.payload.url); // Update form state
      } else {
        throw new Error("File upload unsuccessful!");
      }
    } catch (error) {
      console.error(error);
        setValue(props.name || "imageUrl", 'data.payload.url'); // Update form state
        alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]); // Only handle the first file
    }
  };

  return (
    <div className="file-uploader relative">
      {/* File Input */}
      {!fileName && (
        <label className="cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*" // Restrict to image files
          />
          <div className="flex items-center justify-center border border-dashed border-gray-400 rounded-md p-4 py-2 text-sm">
            {isUploading ? "Uploading..." : "Click to upload a file"}
          </div>
        </label>
      )}

      {/* Display File Name */}
      {fileName && (
        <div className="uploaded-file">
          <p className="text-sm text-gray-700">
            <strong>Uploaded File:</strong> {fileName}
          </p>
        </div>
      )}

      {/* Hidden Input for the URL */}
      <input
        type="text"
        {...props}
        ref={ref}
        value={fileUrl}
        readOnly
        className="absolute invisible opacity-0"
      />
    </div>
  );
});

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
