'use client';

import { InputHTMLAttributes, useState, forwardRef, useEffect, useRef, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { LucideTrash2, RotateCcw } from 'lucide-react';
import { toast } from "sonner";
import { deleteImage, uploadImage } from "@/lib/utils/api/imageApi";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_API;

const ImageUploader = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  // Memoize the form field name once to avoid repetition
  const name = useMemo(() => props.name || "imageUrl", [props.name]);

  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { setValue, getValues } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize component state from form value
  useEffect(() => {
    const value = getValues(name);
    if (value) {
      setFileName(value.split("/").at(-1) ?? "");
      setFileUrl(value);
    }
  }, [getValues, name]);

  const { onChange } = props
  // Reset uploader state and form value
  const reset = useCallback(() => {
    setFileName("");
    setFileUrl("");
    setUploadError(null);
    setUploadProgress(0);
    setValue(name, "");
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: "",
        }
      };
      onChange(syntheticEvent as any);
    }
  }, [setValue, name, onChange]);

  // Handle image deletion
  const removeImage = useCallback(async () => {
    try {
      setIsDeleting(true);
      const data = await deleteImage({ url: fileUrl });

      if (data.payload.success) {
        reset();
      } else {
        throw new Error(data.message ?? "Delete failed without server message");
      }
    } catch (error: any) {
      toast.error("Delete action failed", {
        description: `Error: ${error.message}`,
      });
    } finally {
      setIsDeleting(false);
    }
  }, [fileUrl, reset]);

  // Upload the selected file and track progress
  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setLastFile(file);

    try {
      const data = await uploadImage(file, {
        onProgress: (progress) => setUploadProgress(progress),
      });

      if (data.payload.success) {
        const imgUrl = `${baseUrl}/${data.payload.url}`;
        setFileName(data.payload.url);
        setFileUrl(imgUrl);
        setValue(name, imgUrl);
        if (onChange) {
          const syntheticEvent = {
            target: {
              name,
              value: imgUrl,
            }
          };
          onChange(syntheticEvent as any);
        }
      } else {
        throw new Error(data.message ?? "Upload failed without server message");
      }
    } catch (error: any) {
      setValue(name, "");
      setUploadError(error.message);
      toast.error("Upload failed", {
        description: `Error: ${error.message}`,
      });
    } finally {
      setIsUploading(false);
    }
  }, [setValue, name, onChange]);

  // Handle file input change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [uploadFile]);

  return (
    <div className="file-uploader relative space-y-2">
      {/* Upload prompt when no file and no error */}
      {!fileName && !uploadError && (
        <label className="cursor-pointer block">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            ref={fileInputRef}
          />
          <div className="flex items-center justify-center border border-dashed border-gray-400 rounded-md p-4 py-2 text-sm">
            {isUploading ? "Uploading..." : "Click to upload a file"}
          </div>
        </label>
      )}

      {/* Upload progress bar */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Uploaded file UI */}
      {fileName && !uploadError && (
        <div className={`uploaded-file flex items-center justify-between ${isDeleting && 'opacity-50'}`}>
          <p className="text-sm text-gray-700">
            <strong>Uploaded:</strong> {fileName}
          </p>
          <button
            disabled={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              removeImage();
            }}
            className="flex items-center gap-1"
          >
            {isDeleting ? (
              <span className="text-xs text-gray-500">Deleting...</span>
            ) : (
              <LucideTrash2 className="h-4 w-4 text-red-500" />
            )}
          </button>
        </div>
      )}

      {/* Error UI with retry */}
      {uploadError && (
        <div className="text-sm text-red-600 flex items-center justify-between">
          <span>Error: {uploadError}</span>
          {lastFile && (
            <div className="flex-center w-fit gap-2">
              <button
                onClick={() => uploadFile(lastFile)}
                className="text-blue-500 flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </button>
              <button
                disabled={isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
              >
                <LucideTrash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hidden input to sync with react-hook-form */}
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
