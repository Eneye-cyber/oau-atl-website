/* eslint-disable @next/next/no-img-element */
// components/ImageUploader.tsx
'use client';
import { useState, DragEvent, ChangeEvent } from "react";

interface ImagePreview {
  file: File;
  preview: string;
}

export default function ImageUploader() {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    const imagePreviews = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...imagePreviews]);
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
