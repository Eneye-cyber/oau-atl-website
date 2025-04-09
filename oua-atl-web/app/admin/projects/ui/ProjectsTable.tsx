"use client";
import EntityTable from "@/app/ui/EntityTable";
import { ProjectColumns, ProjectPreviewColumns } from "@/lib/utils/tables";
import { PreviewMethods, ProjectCollection, ProjectPreviewCollection } from "@/app/lib/types";

const ProjectsTable = () => {
  return (
    <EntityTable
      config={{
        entityName: "Project",
        endpoint: "projects",
        path: "projects",
        previewEndpoint: "projects/preview",
        idKey: "project_id",
        displayKey: "name",
        columns: ProjectColumns,
        previewColumns: ProjectPreviewColumns,
        methodLabels: {
          DELETE: "Project Deleted",
          POST: "Project Created",
          PUT: "Project Edited",
          PATCH: "Project Modified",
        },
        transformRow: (item: ProjectCollection) => ({
          ...item,
          location: `${item.location.city}, ${item.location.state}`,
        }),
        transformPreviewRow: (item: ProjectPreviewCollection) => {
          const { method, payload } = item;

          const location =
            payload.location_data
              ? `${payload.location_data.city}, ${payload.location_data.state}`
              : "Unknown Location";
        
          return {
            ...payload,
            method,
            location,
          };
        },
      }}
    />
  );
};

export default ProjectsTable;
