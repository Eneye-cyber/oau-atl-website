'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/app/ui/DataTable';
import { fetchData } from '@/lib/utils/client/api';
import { EventColumns } from '@/lib/utils/tables';
import { PaginationComponent } from '@/components/ui/pagination';
import { EventCollection, PaginatedResponse } from '@/app/lib/types';
import TableLoader from '@/app/ui/loaders/TableLoader';
import { useSearchParams } from 'next/navigation';
import {FetchError} from "@/components/ui/fetch-error"

type EventCollectionResponse = PaginatedResponse<EventCollection[] | []>;

const DEFAULT_RESPONSE: EventCollectionResponse = {
  message: '',
  payload: {
    data: [],
    page: 1,
    totalCount: 0,
    totalPages: 1,
  },
  error: false,
};

const EventsTable = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') ?? '';
  const page = Math.max(1, Number(searchParams?.get('page') ?? 1));

  const [data, setData] = useState<EventCollectionResponse>(DEFAULT_RESPONSE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      const apiPath = status === 'history' ? 'physical-events/history' : 'physical-events/latest';

      try {
        const response = await fetchData(`${apiPath}?page=${page}`);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [status, page]);

  if (loading) return <TableLoader />;
  if (error || data.error) return <FetchError error={error ? error : null} showDetails={!!error} />;

  const tableData =
    data?.payload?.data.map((item: EventCollection) => ({
      ...item,
      location: `${item.location.postal_code}, ${item.location.city}, ${item.location.state}`,
    })) ?? [];

  const path = status === 'history' ? '/admin/events?status=history' : '/admin/events';
  const header = status === 'history' ? 'Previous Events' : 'Upcoming Events';

  return (
    <>
      <DataTable
        title={header}
        columns={EventColumns}
        path="events"
        idKey="event_id"
        data={tableData}
        showActions
      />
      <PaginationComponent path={path} page={page} total={data?.payload?.totalPages || 1} />
    </>
  );
};

export default EventsTable;
