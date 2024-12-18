import DataTable from '@/app/ui/DataTable'
import { fetchData } from '@/lib/utils/api';
import { ProjectCollection, PaginatedResponse } from '@/app/lib/types';
import { ProjectColumns } from '@/lib/utils/tables';
import { PaginationComponent } from '@/components/ui/pagination';

type ProjectCollectionResponse = PaginatedResponse<ProjectCollection[] | []>;
async function getData(status: string, page: number) {
  const path = status ? `projects?status=${status}&page=${page} ` : `projects?page=${page}`;
  const defaultResponse = {
    message: '',
    payload: {
      data: [],
      page: 1,
      totalCount: 0,
      totalPages: 1,
    },
    error: false,
  };
  try {
    const data = await fetchData(`${path}`);
    return { ...defaultResponse, ...data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { ...defaultResponse, error: true, message: 'Failed to fetch events' };
  }
}

const ProjectsTable = async ({ status, page }: { status: string; page: number }) => {
  const path = status ? `projects?status=${status}` : `projects`;
  const data: ProjectCollectionResponse = await getData(status, page);


  let tableData = data?.payload?.data?.map(
    (item: ProjectCollection) => ({...item, location: `${item.location.city}, ${item.location.state}`})
  ) ?? []

  return (
    <>
      <DataTable columns={ProjectColumns} path="projects" idKey='project_id' data={tableData || []} showActions />
      <PaginationComponent path={path} page={page} total={data?.payload?.totalPages || 1} />
    </>
  )
};

export default ProjectsTable;

