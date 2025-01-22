'use client';
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LuMoreHorizontal, LuEye, LuFileEdit, LuTrash2 } from 'react-icons/lu';


const ActionMenu = ({ path, id, hasEdit = true, hasDelete = true, hasView = true }: { path?: string; id?: string; hasEdit?: boolean; hasDelete?: boolean; hasView?: boolean}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!id || !path) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/${path}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the item.");
      }

      // Refresh or redirect after deletion
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-8 w-8 p-0 mx-auto">
            <span className="sr-only">Open menu</span>
            <LuMoreHorizontal />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-40" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-950/5" />
          {
            hasView && (
              <DropdownMenuItem>
                <Link href={`/admin/${path}/${id}`}>
                  <LuEye className="inline-block mr-1" />
                  View
                </Link>
              </DropdownMenuItem>
            )
          }
          {
            hasEdit && (
              <DropdownMenuItem>
                <Link href={`/admin/${path}/${id}/edit`}>
                  <LuFileEdit className="inline-block mr-1" />
                  Edit
                </Link>
              </DropdownMenuItem>
            )
          }

          {
            hasDelete && (
              <DropdownMenuItem className="cursor-pointer" onClick={() => setShowDeleteModal(true)}>
                <LuTrash2 className="inline-block" />
                Delete
              </DropdownMenuItem>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-sm text-white bg-red-600 rounded-md ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                }`}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionMenu