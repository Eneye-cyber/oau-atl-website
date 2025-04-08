'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/app/ui/DataTable';
import { fetchData, finalizeChange } from '@/lib/utils/client/api';
import { EventColumns, EventPreviewColumns } from '@/lib/utils/tables';
import { PaginationComponent } from '@/components/ui/pagination';
import { BasicResponse, EventCollection, EventPreviewCollection, PaginatedResponse, PreviewMethods } from '@/app/lib/types';
import TableLoader from '@/app/ui/loaders/TableLoader';
import { useRouter, useSearchParams } from 'next/navigation';
import {FetchError} from "@/components/ui/fetch-error"
import { LuStar } from 'react-icons/lu';
import { LucideCheck, LucideEye, LucideX } from 'lucide-react';
import { toast } from 'sonner';

type EventCollectionResponse = PaginatedResponse<EventCollection[] | []>;
type EventPreviewResponse = BasicResponse<EventPreviewCollection[] | []>;
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

const DEFAULT_PREVIEW_RESPONSE: EventPreviewResponse = {
  message: '',
  payload: [],
  error: false,
};

const ActionMessage: Record<PreviewMethods, string> = {
  'DELETE': "Event Deleted",
  'POST': "Event Created",
  'PUT': "Event Edited",
  'PATCH': "Event Modified",
};



const EventsTable = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const page = Math.max(1, Number(searchParams?.get('page') ?? 1));

  const [data, setData] = useState<EventCollectionResponse>(DEFAULT_RESPONSE);
  const [previewData, setPreviewData] = useState<EventPreviewResponse>(DEFAULT_PREVIEW_RESPONSE);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      const apiPath = !status ? 'physical-events/preview' : status === 'history' ? 'physical-events/history' : 'physical-events/latest';

      try {
        const response = await fetchData(`${apiPath}?page=${page}`);
        if(!status) {
          setPreviewData(response)
        } else {

          setData(response);
        }
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

  const customActions = [
    {
      label: 'Preview',
      icon: <LucideEye />,
      onClick: (id: string) => router.push(`/admin/events/${id}/preview`),
    },
    {
      label: 'Approve',
      icon: <LucideCheck />,
      onClick: async (id: string) => await settle(id, 'finalize'),
    },
    {
      label: 'Reject',
      icon: <LucideX />,
      onClick: async (id: string) =>  await settle(id, 'discard'),
    },
  ];

  const removeItemById = (idToRemove: string) => {
    if (!status) {
      setPreviewData((prev) => ({
        ...prev,
        payload: prev.payload.filter(item => item.preview_id !== idToRemove),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        payload: {
          ...prev.payload,
          data: prev.payload.data.filter(item => item.event_id !== idToRemove),
        },
      }));
    }
  };

  const settle = async (id: string, decision: 'finalize' | 'discard') => {
    try {
      setActionLoading(true)
      const url = decision === 'finalize' ? `/physical-events/${id}/finalize` : `/physical-events/${id}/discard`
      const message = decision === 'finalize' ? 'Event modifications approved' : 'Changes rejected'

      const response = await finalizeChange(id, url)
      if(response.error) {
        throw new Error (response.message ?? "Server Error")
      }
      toast.success(message, {description: response.message})
      removeItemById(id)
    } catch (error: any) {
      toast.error("Server error", {description: (error as Error)?.message})
    } finally {
      setActionLoading(false)
    }
  }

  const tableData = !status ? previewData.payload.map((item) => ({
    ...item.payload, method: ActionMessage[item.method], "event_id": item.preview_id
    
  })) : (
    data?.payload?.data.map((item: EventCollection) => ({
      ...item,
      location: `${item.location.postal_code}, ${item.location.city}, ${item.location.state}`,
    })) ?? []);

  const path = !status? '/admin/events' : status === 'history' ? '/admin/events?status=history' : '/admin/events?status=latest';
  const header = !status ? 'Unapproved Events Modifications' : status === 'history' ? 'Previous Events' : 'Upcoming Events';

  return (
    <div className={`w-full space-y-4 ${actionLoading && 'opacity-35 pointer-events-none'}`}>
      {
        !status ? (
          <DataTable
            title={header}
            columns={EventPreviewColumns }
            path={"events/preview"}
            idKey="event_id"
            data={tableData}
            customActions={customActions}
          />
        ) : (
          <DataTable
            title={header}
            columns={EventColumns}
            path={"events"}
            idKey="event_id"
            data={tableData}
            showActions
          />
        )
      }
      <PaginationComponent path={path} page={page} total={data?.payload?.totalPages || 1} />
    </div>
  );
};

export default EventsTable;
