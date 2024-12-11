/* eslint-disable @next/next/no-img-element */
// components/MultipleImageUploader.tsx
'use client';
import { InputHTMLAttributes, useState, forwardRef, DragEvent, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface ImagePreview {
  file: File;
  preview: string;
  uploadedUrl?: string | null;
}

const MultipleImageUploader = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { setValue, getValues } = useFormContext(); // Access React Hook Form's context
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const validImages = files.filter((file) => file.type.startsWith("image/"));
  
    // Process files asynchronously
    const imagePreviews = await Promise.all(
      validImages.map(async (file) => ({
        file,
        preview: URL.createObjectURL(file), // Temporary local preview
        uploadedUrl: await handleUpload(file), // Upload and get the URL
      }))
    );
    
    await setImages((prev) => [...prev, ...imagePreviews]); // Update state with resolved data
    setValue(props.name || "urls", [...images.map((file) => file.uploadedUrl), ...imagePreviews.map((file) => file.uploadedUrl)]) 
    console.log(getValues(props.name || "urls"))
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const uploadFile = async (file: File) => {
    console.log('file', file)
    const url = `/api/image`; // Endpoint for uploading
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed!");
      }

      const data = await response.json();
      if (data.payload[0].success) {
        return data.payload[0].url; // Return the uploaded URL
      } else {
        throw new Error("File upload unsuccessful!");
      }
    } catch (error) {
      console.error(error);
      alert("File upload failed. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload: (file: File) => Promise<string | null> = async (file) => {// Skip if already uploaded

    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      // Update the images state
      return uploadedUrl
    }
    return null
  };

  const removeImage = (index: number) => {
    const image = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));

    // Remove the URL from the form state
    if (image.uploadedUrl) {
      const currentUrls = getValues(props.name || "imageUrl") || [];
      setValue(props.name || "imageUrl", currentUrls.filter((url: string) => url !== image.uploadedUrl));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="w-full h-40 border-2 border-dashed border-gray-300 bg-slate-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all p-4"
      >
        <p className="text-gray-500 text-sm">
          Drag & Drop your images here, or{" "}
          <span className="text-blue-500 cursor-pointer underline">
            click to upload
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </span>
        </p>
      </label>
      <div className="border border-slate-200 sm:col-span-6 my-3"></div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
              <img
                src={image.preview}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
              {!image.uploadedUrl && (
                <button
                  className="absolute bottom-1 left-1 bg-blue-500 text-white rounded px-2 py-1 text-xs"
                >
                  Upload
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={props.name || "imageUrl"} value={JSON.stringify(getValues(props.name || "imageUrl") || [])} />
    </div>
  );
});

MultipleImageUploader.displayName = "MultipleImageUploader";

export default MultipleImageUploader;
