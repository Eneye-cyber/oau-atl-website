'use client';
import {type FC} from "react";
import SearchIcon from './SearchIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuMoreHorizontal, LuEye, LuFileEdit } from "react-icons/lu";
// import ChevronDown from './ChevronDown'
interface Project {
  id: string;
  name: string;
  goal: number;
  amount: number;
  contributors: number;
  deadline?: string;
  status: "Active" | "Complete" | "Overdue";
}
interface ProjectsTableProps {
  projects: Project[];
}

const TableDataCell = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <td className="p-0 first-of-type:ps-1 last-of-type:pe-1 sm:first-of-type:ps-3 sm:last-of-type:pe-3">
      <div className="grid w-full gap-y-1 px-3 py-4">
        <div className="inline-flex items-center gap-1.5">
            {children}
        </div>
      </div>
    </td>
  )
}

const ActionMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <LuMoreHorizontal />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-40" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-950/5" />
        <DropdownMenuItem>
          <LuEye className="inline-block mr-1" />
          View project
        </DropdownMenuItem>
        <DropdownMenuItem><LuFileEdit className="inline-block mr-1" />Edit project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ProjectsTable: FC<ProjectsTableProps>  = ({ projects }) => {
  return (
    <div className="overflow-x-auto divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 ">
      <div className="divide-y divide-gray-200 dark:divide-white/10">
        <div className="flex justify-end gap-x-4 px-4 py-3 sm:px-6">
          <div className="fi-ta-search-field">
            <label htmlFor="input-2" className="sr-only">
              Search
            </label>

            <div className="fi-input-wrp flex rounded-lg shadow-sm ring-1 transition duration-75 bg-white dark:bg-white/5 focus-within:ring-2 ring-gray-950/10 dark:ring-white/20 focus-within:ring-primary-600 dark:focus-within:ring-primary-500">
              <div className="items-center gap-x-3 ps-3 flex pe-2">
                <SearchIcon />
              </div>

              <div className="min-w-0 flex-1">
                <input
                  className="fi-input block w-full border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.400)] dark:text-white dark:placeholder:text-gray-500 dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] dark:disabled:placeholder:[-webkit-text-fill-color:theme(colors.gray.500)] sm:text-sm sm:leading-6 bg-white/0 ps-0 pe-3"
                  autoComplete="off"
                  placeholder="Search"
                  type="search"
                  id="input-2"
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {

                    }
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      <table className="min-w-full shadow-md rounded-lg w-full table-auto divide-y divide-gray-200 text-start ">
        <thead className="divide-y divide-gray-200">
          <tr className="bg-gray-100 ">
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-number">
              <button
                aria-label="Number"
                type="button"
                className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start"
              >
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Project name
                </span>
                {/* <ChevronDown /> */}
              </button>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-customer.name">
              <button
                aria-label="Customer"
                type="button"
                className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start"
              >
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Financial goal
                </span>
                
              </button>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-status">
              <span className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start">
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Contributed amount
                </span>
              </span>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-currency">
              <button
                aria-label="Currency"
                type="button"
                className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start"
              >
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  No of contributors
                </span>
                
              </button>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-total-price">
              <button
                aria-label="Total price"
                type="button"
                className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start"
              >
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Project deadline
                </span>
                
              </button>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-status">
              <span className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start">
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Status
                </span>
              </span>
            </th>
            <th className="fi-ta-header-cell px-3 py-3.5 sm:first-of-type:ps-6 sm:last-of-type:pe-6 fi-table-header-cell-status">
              <span className="group flex w-full items-center gap-x-1 whitespace-nowrap justify-start">
                <span className="fi-ta-header-cell-label text-sm font-semibold text-gray-950 dark:text-white">
                  Action
                </span>
              </span>
            </th>
            
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 whitespace-nowrap dark:divide-white/5">
          {projects.map((project, index) => (
            <tr 
              key={index}
              className="[@media(hover:hover)]:transition [@media(hover:hover)]:duration-75 hover:bg-gray-50 dark:hover:bg-white/5">
                <TableDataCell>{project.name}</TableDataCell>
                <TableDataCell>${project.goal}</TableDataCell>
                <TableDataCell>${project.amount}</TableDataCell>
                <TableDataCell>{project.contributors}</TableDataCell>
                <TableDataCell>{project.deadline}</TableDataCell>
                <TableDataCell>{project.status}</TableDataCell>
                <TableDataCell><ActionMenu /></TableDataCell>
            </tr>

          ))}

          
        </tbody>
      </table>
    </div>
  );
};


export default ProjectsTable;
