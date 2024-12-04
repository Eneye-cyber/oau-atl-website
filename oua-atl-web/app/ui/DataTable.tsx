/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LuMoreHorizontal, LuEye, LuFileEdit, LuTrash2 } from 'react-icons/lu';
import Image from 'next/image'
import Link from 'next/link';
import { formatDate } from '@/lib/utils'
interface TableProps {
  columns: { key: string; label: string; type?: string}[]; // Defines table columns with a key and label
  data: Record<string, any>[]; // Array of objects where each object represents a row
  path?: string; // Controls the api url path of the table
  showActions?: boolean; // Controls visibility of the action column
  title?: string;
  idKey?: string;
  errorMessage?: string;
}

const TableDataCell: FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="p-0 first-of-type:ps-1 last-of-type:pe-1 sm:first-of-type:ps-3 sm:last-of-type:pe-3">
    <div className="grid w-full gap-y-1 px-3 py-4">
      <div className="inline-flex items-center gap-1.5">{children}</div>
    </div>
  </td>
);

const TableImageCell: FC<{ src: string }> = ({ src }) => (
  <td className="p-0 first-of-type:ps-1 last-of-type:pe-1 sm:first-of-type:ps-3 sm:last-of-type:pe-3">
    <div className="grid w-full gap-y-1 px-3 py-2">
      <div className="inline-flex items-center gap-1.5">
        <Image src={src} width={100} height={70} alt={'row image'} />
      </div>
    </div>
  </td>
);

const ActionMenu = ({ path, id }: { path?: string; id?: string }) => {
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
          <DropdownMenuItem>
            <Link href={`/admin/${path}/${id}`}>
              <LuEye className="inline-block mr-1" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/admin/${path}/${id}/edit`}>
              <LuFileEdit className="inline-block mr-1" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <LuTrash2 className="inline-block mr-1" />
            Delete
          </DropdownMenuItem>
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


const DataTable: FC<TableProps> = ({title, columns, path, data, idKey, showActions = false, errorMessage }) => {
  return (
    <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5">
      <div className="divide-y divide-gray-200 dark:divide-white/10">
        <div className="flex items-center gap-x-4 px-4 sm:px-6">
          {title && (
            <div className="py-3">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-auto">
        {data.length > 0 ? (
          <table className="min-w-full shadow-md rounded-lg w-full table-auto divide-y divide-gray-200 text-start">
            {/* Table Header */}
            <thead className="divide-y divide-gray-200 bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 ${
                      column.label.toLowerCase() === 'image' && 'md:table-cell w-full max-w-[10%]'
                    }`}
                  >
                    <button
                      aria-label={column.label}
                      type="button"
                      className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start"
                    >
                      <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                        {column.label}
                      </span>
                    </button>
                  </th>
                ))}
                {showActions && (
                  <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6">
                    <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                      Actions
                    </span>
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 whitespace-nowrap dark:divide-white/5">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="[@media(hover:hover)]:transition [@media(hover:hover)]:duration-75 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {columns.map((column) => (
                    <TableDataCell key={column.key}>
                      {column.label.toLowerCase() === 'image' ? (
                        <img src={row[column.key] ?? '/img/placeholder.svg'} width={100} height={70} className="max-w-28" alt={'event name'} />

                      ) : (
                        column?.type === 'date' ? formatDate(row[column.key]) : row[column.key]
                      )}
                    </TableDataCell>
                  ))}
                  {showActions && (
                    <TableDataCell>
                      <ActionMenu path={path} id={row[idKey ?? 'id']} />
                    </TableDataCell>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-64 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h11m-1-2v4m6 4H5m10-8l3 3-3 3m-7 2l-3-3 3-3"
              />
            </svg>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">No data available yet.</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{errorMessage ?? 'Once data is available, it will appear here.'}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DataTable;
