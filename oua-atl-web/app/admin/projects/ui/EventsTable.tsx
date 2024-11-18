'use client';
import React from "react";
import {EditIcon, DeleteIcon, EyeIcon} from "./ActionIcons";
// import {columns, users} from "../data";

// const statusColorMap: Record<string, ChipProps["color"]>  = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// type User = typeof users[0];

// export default function EventsTable() {
//   const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
//     const cellValue = user[columnKey as keyof User];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{radius: "lg", src: user.avatar}}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-sm capitalize">{cellValue}</p>
//             <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex items-center gap-2">
//             <Tooltip content="Details">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content="Edit user">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color="danger" content="Delete user">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   return (
//   <Table aria-label="Example table with custom cells">
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={users}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price?: string;
}

interface EventsTableProps {
  events: Event[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EventsTable: React.FC<EventsTableProps>  = ({ events, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 text-left text-sm font-semibold">#</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Project Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Donation Goals</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Amount Donated</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Inception</th>
            <th className="py-3 px-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={event.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="py-3 px-4 text-sm">{index + 1}</td>
              <td className="py-3 px-4 text-sm">{event.name}</td>
              <td className="py-3 px-4 text-sm">{event.date}</td>
              <td className="py-3 px-4 text-sm">{event.location}</td>
              <td className="py-3 px-4 text-sm">${event.price ?? '00.00'}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onEdit(event.id)}
                  className="mr-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
