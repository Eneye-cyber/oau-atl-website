"use client";
import EntityTable from "@/app/ui/EntityTable";
import { ExecutiveMembersColumns, ExecutiveMembersPreviewColumns } from "@/lib/utils/tables";
import { ProjectPreviewCollection } from "@/app/lib/types";

const ExecutivesTable = () => {
  return (
    <EntityTable
      config={{
        entityName: "Executive Members",
        endpoint: "executives",
        path: "members/executive",
        previewEndpoint: "executives/preview",
        idKey: "exec_id",
        displayKey: "name",
        columns: ExecutiveMembersColumns,
        previewColumns: ExecutiveMembersPreviewColumns,
        methodLabels: {
          DELETE: "Executive Member Deleted",
          POST: "Executive Member Created",
          PUT: "Executive Member Edited",
          PATCH: "Executive Member Modified",
        },
        transformRow: (item) => ({
          ...item,
          is_active: item.is_active ? "Active" : "Inactive",
        }),
        transformPreviewRow: (item) => {
          const { method, payload } = item;
        
          return {
            ...payload,
            method,
            is_active: payload.is_active ? "Active" : "Inactive",
          };
        },
      }}
    />
  );
};

export default ExecutivesTable;
