'use client'
import { useState } from 'react';
import EventsTable from './ui/EventsTable'
import Button from '@/app/ui/shared/Button'



interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price?: string
}

const Page = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Tech Conference', date: '2024-11-25', location: 'New York', price: '10.00' },
    { id: 2, name: 'Art Workshop', date: '2024-12-10', location: 'San Francisco' },
    { id: 3, name: 'Music Festival', date: '2024-12-20', location: 'Los Angeles', price: '10.00' },
  ]);

  const handleEdit = (id: number): void => {
    alert(`Edit event with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id: number): void => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };
  return (
    <section className="p-6 ">

      <h1 className="text-2xl font-semibold mb-4">Manage Projects</h1>

      <div className="py-3 flex justify-end">
        <Button href="/admin/events/create">Create Project</Button>
      </div>
      <EventsTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
    </section>
  )
}

export default Page