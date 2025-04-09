"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/ui/DataTable";
import TableLoader from "@/app/ui/loaders/TableLoader";
import { PaginationComponent } from "@/components/ui/pagination";
import { FetchError } from "@/components/ui/fetch-error";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { LucideCheck, LucideX } from "lucide-react";
import { finalizeChange, fetchData } from "@/lib/utils/client/api";

type Config = {
  entityName: string;
  path: string;
  endpoint: string;
  previewEndpoint: string;
  idKey: string;
  displayKey: string;
  columns: any;
  previewColumns: any;
  transformRow: (item: any) => any;
  transformPreviewRow: (item: any) => any;
  methodLabels: Record<string, string>;
};

const DEFAULT_RESPONSE = {
  message: "",
  payload: {
    data: [],
    page: 1,
    totalCount: 0,
    totalPages: 1,
  },
  error: false,
};

const DEFAULT_PREVIEW_RESPONSE = {
  message: "",
  payload: [],
  error: false,
};


const EntityTable = ({ config }: { config: Config }) => {
  const [data, setData] = useState<any>(DEFAULT_RESPONSE);
  const [previewData, setPreviewData] = useState<any>(DEFAULT_PREVIEW_RESPONSE);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const page = Math.max(1, Number(searchParams?.get("page") ?? 1));

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      const path = !status
        ? `${config.previewEndpoint}`
        : status === "all" ? `${config.endpoint}?page=${page}` : `${config.endpoint}?status=${status}&page=${page}`;

      try {
        const response = await fetchData(path);
        if (response?.error) throw new Error(response.message);
        if (!status) {
          setPreviewData(response);
        } else {
          setData(response);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [status, page, config.endpoint, config.previewEndpoint]);

  if (loading) return <TableLoader />;
  if (error || data?.error || previewData?.error)
    return <FetchError error={error} showDetails={!!error} />;

  const customActions = [
    {
      label: "Approve",
      icon: <LucideCheck />,
      onClick: async (id: string) => await settle(id, "finalize"),
    },
    {
      label: "Reject",
      icon: <LucideX />,
      onClick: async (id: string) => await settle(id, "discard"),
    },
  ];

  const removeItemById = (idToRemove: string) => {
    if (!status) {
      setPreviewData((prev: any) => ({
        ...prev,
        payload: prev.payload.filter(
          (item: any) => item.preview_id !== idToRemove
        ),
      }));
    } else {
      setData((prev: any) => ({
        ...prev,
        payload: {
          ...prev.payload,
          data: prev.payload.data.filter(
            (item: any) => item[config.idKey] !== idToRemove
          ),
        },
      }));
    }
  };

  const settle = async (id: string, decision: "finalize" | "discard") => {
    try {
      setActionLoading(true);
      const url = `/${config.endpoint}/${id}/${decision}`;
      const message =
        decision === "finalize"
          ? `${config.entityName} modifications approved`
          : "Changes rejected";

      const response = await finalizeChange(id, url);
      if (response.error) throw new Error(response.message);
      toast.success(message, { description: response.message });
      toast.success("Reload page to reflect count changes");
      removeItemById(id);
    } catch (error: any) {
      if(error?.message?.includes('404')) removeItemById(id)
      toast.error("Server error", { description: error.message });
    } finally {
      setActionLoading(false);
    }
  };

  const tableData = !status
    ? previewData.payload.map((item: any) => ({
        ...config.transformPreviewRow(item),
        method: config.methodLabels[item.method],
        [config.idKey]: item.preview_id,
      }))
    : data.payload.data.map(config.transformRow);

  return (
    <div
      className={`w-full space-y-4 ${
        actionLoading ? "opacity-35 pointer-events-none" : ""
      }`}
    >
      <DataTable
        title={
          !status
            ? `Unapproved ${config.entityName} changes`
            : status === "history"
            ? `Previous ${config.entityName}s`
            : `Upcoming ${config.entityName}s`
        }
        columns={!status ? config.previewColumns : config.columns}
        path={config.path}
        idKey={config.idKey}
        data={tableData}
        customActions={!status ? customActions : undefined}
        showActions={!!status}
      />
      {status && (
        <PaginationComponent
          path={`${config.path}?status=${status}`}
          page={page}
          total={data.payload.totalPages || 1}
        />
      )}
    </div>
  );
};

export default EntityTable;
