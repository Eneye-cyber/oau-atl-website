import DataTable from '@/app/ui/DataTable';
import { fetchData } from '@/lib/utils/api';
import { EventColumns } from '@/lib/utils/tables';
import { PaginationComponent } from '@/components/ui/pagination';
import { EventCollection } from '@/app/lib/types';

interface EventResponse {
  message: string;
  payload: {
    data: EventCollection[] | [];
    page: number;
    totalCount: number;
    totalPages: number;
  };
  error?: boolean;
}

async function getData(status: string, page: number) {
  const apiPath = status === 'history' ? 'physical-events/history' : 'physical-events/latest';
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
    const data = await fetchData(`${apiPath}?page=${page}`);
    return { ...defaultResponse, ...data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { ...defaultResponse, error: true, message: 'Failed to fetch events' };
  }
}

const EventsTable = async ({ status, page }: { status: string; page: number }) => {
  const path = status === 'history' ? '/admin/events?status=history' : '/admin/events';

  const data: EventResponse = await getData(status, page);
  const tableData =
    data?.payload?.data.map((item: EventCollection) => ({
      ...item,
      location: `${item.location.postal_code}, ${item.location.city}, ${item.location.state}`,
    })) ?? [];

  const header = status === 'history' ? 'Previous Events' : 'Upcoming Events';

  return (
    <>
      <DataTable title={header} columns={EventColumns} path="events" idKey="event_id" data={tableData} showActions />
      <PaginationComponent path={path} page={page} total={data?.payload?.totalPages || 1} />
    </>
  );
};

export default EventsTable;
