"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/ui/DataTable";
import { fetchData } from "@/lib/utils/client/api";
import { ProjectCollection, PaginatedResponse } from "@/app/lib/types";
import { ProjectColumns } from "@/lib/utils/tables";
import { PaginationComponent } from "@/components/ui/pagination";
import TableLoader from '@/app/ui/loaders/TableLoader';
import {FetchError} from "@/components/ui/fetch-error";

type ProjectCollectionResponse = PaginatedResponse<ProjectCollection[] | []>;

const ProjectsTable = ({ status, page }: { status: string; page: number }) => {
  const [data, setData] = useState<ProjectCollectionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      const path = status ? `projects?status=${status}&page=${page}` : `projects?page=${page}`;

      try {
        const response = await fetchData(path);
        if(response?.error) {
          throw new Error(response?.message ?? "Something went wrong")
        }
        setData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError((err as Error)?.message ?? "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [status, page]);

  let tableData =
    data?.payload?.data?.map((item: ProjectCollection) => ({
      ...item,
      location: `${item.location.city}, ${item.location.state}`,
    })) ?? [];

  return (
    <>
      {loading ? (
        <TableLoader />
      ) : error ? (
        <FetchError message={error} />
      ) : (
        <>
          <DataTable columns={ProjectColumns} path="projects" idKey="project_id" data={tableData} showActions />
          <PaginationComponent path="projects" page={page} total={data?.payload?.totalPages || 1} />
        </>
      )}
    </>
  );
};

export default ProjectsTable;
