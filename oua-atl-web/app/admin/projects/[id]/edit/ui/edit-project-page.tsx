'use client';

import { useEffect, useState } from "react";
import EditProject from "@/app/ui/forms/project/EditProject";
import { ProjectResponseObject } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/client/api";
import Loading from "../../loading";
import { FetchError } from "@/components/ui/fetch-error";


const EditProjectPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<ProjectResponseObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const url = `/projects/${params.id}`;
        const response = await fetchData(url, 'no-cache');

        if (!response.payload) {
          setError("Project not found.");
          return;
        }

        setProject(response.payload);
      } catch (err) {
        setError("Failed to fetch project.");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) return <Loading />;
  if (error || !project) return <FetchError />;
  
  return (
    <section className="p-3 md:p-6">
      <EditProject project={project} id={params.id} />
    </section>
  );
};

export default EditProjectPage;
