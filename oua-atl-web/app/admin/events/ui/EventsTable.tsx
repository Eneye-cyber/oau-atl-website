"use client";
import EntityTable from "@/app/ui/EntityTable";
import { EventColumns, EventPreviewColumns } from "@/lib/utils/tables";
import { EventCollection, EventPreviewCollection, PreviewMethods } from "@/app/lib/types";

const EventsTable = () => {
  return (
    <EntityTable
      config={{
        entityName: "Event",
        path: "events",
        endpoint: "physical-events",
        previewEndpoint: "physical-events/preview",
        idKey: "event_id",
        displayKey: "title",
        columns: EventColumns,
        previewColumns: EventPreviewColumns,
        methodLabels: {
          DELETE: "Event Deleted",
          POST: "Event Created",
          PUT: "Event Edited",
          PATCH: "Event Modified",
        },
        transformRow: (item: EventCollection) => ({
          ...item,
          location: `${item.location.postal_code}, ${item.location.city}, ${item.location.state}`,
        }),
        transformPreviewRow: (item: EventPreviewCollection) => ({
          ...item.payload,
        }),
      }}
    />
  );
};

export default EventsTable;
