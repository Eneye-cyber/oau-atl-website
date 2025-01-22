/* eslint-disable @next/next/no-img-element */
'use client';
import { InputHTMLAttributes, useState, forwardRef, DragEvent, ChangeEvent, useEffect, MouseEvent } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface ImagePreview {
  file?: File;
  preview: string;
  uploadedUrl?: string | null;
}

const MultipleImageUploader = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { setValue, getValues } = useFormContext();
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.file) URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  // Initialize with existing URLs
  useEffect(() => {
    const urls = getValues(props.name || "urls") || [];
    const mappedImages = urls.map((item: string) => ({
      preview: item,
      uploadedUrl: item,
    }));
    setImages(mappedImages);
    setValue(props.name || "urls", urls);
  }, [getValues, props.name, setValue]);

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

    setImages((prev) => [...prev, ...imagePreviews]);
    setValue(
      props.name || "urls",
      [...images.map((img) => img.uploadedUrl), ...imagePreviews.map((img) => img.uploadedUrl)].filter(Boolean)
    );
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const uploadFile = async (file: File) => {
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
      if (data.payload[0]?.success) {
        return data.payload[0].url; // Return the uploaded URL
      } else {
        throw new Error("File upload unsuccessful!");
      }
    } catch (error) {
      console.error(error);
      toast.error("File upload failed. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      return uploadedUrl;
    }
    return null;
  };

  const removeImage = (index: number) => {
    const image = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));

    if (image.uploadedUrl) {
      const currentUrls = getValues(props.name || "urls") || [];
      setValue(props.name || "urls", currentUrls.filter((url: string) => url !== image.uploadedUrl));
    }
  };

  const retryUpload = async (event: MouseEvent<HTMLButtonElement>, img: ImagePreview, index: number) => {
    event.preventDefault()
    const uploadedUrl = await handleUpload(img.file as File);
    if (uploadedUrl) {
      const updatedImage = { ...img, uploadedUrl };
      setImages((prev) => prev.map((image, i) => (i === index ? updatedImage : image)));
      setValue(props.name || "urls", images.map((img) => img.uploadedUrl).filter(Boolean));
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${isUploading ? "pointer-events-none opacity-50" : ""}`}
      role="region"
      aria-live="polite"
      aria-busy={isUploading}
    >
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
                aria-label="Remove image"
              >
                ×
              </button>
              {!image.uploadedUrl && (
                <button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => retryUpload(e, image, index)}
                  className="absolute bottom-1 left-1 bg-blue-500 text-white rounded px-2 py-1 text-xs"
                  aria-label="Retry upload"
                >
                  Upload
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <input
        type="hidden"
        name={props.name || "urls"}
        value={JSON.stringify(getValues(props.name || "urls") || [])}
      />
    </div>
  );
});

MultipleImageUploader.displayName = "MultipleImageUploader";

export default MultipleImageUploader;
