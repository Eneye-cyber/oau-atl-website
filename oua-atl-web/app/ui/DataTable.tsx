'use client';
import { type FC } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LuMoreHorizontal, LuEye, LuFileEdit } from 'react-icons/lu';

interface TableProps {
  columns: { key: string; label: string }[]; // Defines table columns with a key and label
  data: Record<string, any>[]; // Array of objects where each object represents a row
  showActions?: boolean; // Controls visibility of the action column
  title?: string;
}

const TableDataCell: FC<{ children: React.ReactNode }> = ({ children }) => (
  <td className="p-0 first-of-type:ps-1 last-of-type:pe-1 sm:first-of-type:ps-3 sm:last-of-type:pe-3">
    <div className="grid w-full gap-y-1 px-3 py-4">
      <div className="inline-flex items-center gap-1.5">{children}</div>
    </div>
  </td>
);

const ActionMenu = () => (
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
        <LuEye className="inline-block mr-1" />
        View
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LuFileEdit className="inline-block mr-1" />
        Edit
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const DataTable: FC<TableProps> = ({title, columns, data, showActions = false }) => {
  return (
    <div className="overflow-x-auto divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5">
      <div className="divide-y divide-gray-200 dark:divide-white/10">
        <div className="flex items-center gap-x-4 px-4 sm:px-6">
          {title && (
            <div className="py-3">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          )}
        </div>
      </div>
      <table className="min-w-full shadow-md rounded-lg w-full table-auto divide-y divide-gray-200 text-start">
        {/* Table Header */}
        <thead className="divide-y divide-gray-200 bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6"
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
                <TableDataCell key={column.key}>{row[column.key]}</TableDataCell>
              ))}
              {showActions && (
                <TableDataCell>
                  <ActionMenu />
                </TableDataCell>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
