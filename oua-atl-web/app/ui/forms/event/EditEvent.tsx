'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { useRouter } from "next/navigation"; 
import { EditEventSchema } from "@/app/lib/schema"
import { EventResponseObject } from "@/app/lib/types";
import { formatDateForInput } from "@/lib/utils";

type EventFormData = z.infer<typeof EditEventSchema>;

const EditEvent = ({event}: {event: EventResponseObject}) => {
  const router = useRouter();

  const methods = useForm<EventFormData>({
    resolver: zodResolver(EditEventSchema),
    defaultValues: {
      title: event.title || '', // Maps to `title` in the schema
      imageURL: event.image_url || '', // Maps to `imageUrl` in the schema
      startDate: formatDateForInput(event.start_date) || '', // Maps to `startDate` in the schema
      endDate: formatDateForInput(event.end_date) || undefined, // Maps to `endDate` in the schema
      content: event.content || '', // Maps to `content` in the schema
      entranceFee: event.entrance_fee || 0, // Maps to `entranceFee` in the schema
      isFeatured: event.is_featured ? '1' : '0', // Maps to `isFeatured` in the schema
      locationName: event.location?.postal_code || '', // Assuming place_id is the intended name
      city: event.location?.city || '', // Maps to `city` in the schema
      state: event.location?.state || '', // Maps to `state` in the schema
      address: event.location?.address || '', //
      tags: event.tags || [], // Converts array to comma-separated string
    },

  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {

    try {
      console.log('Form Errors:', errors);
      console.log('Form Data:', data);
      // Send data to your backend
      const response: Response = await fetch(`/api/admin/events/${event.event_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        credentials: "include",
    });

      console.log('event response', response)

      if(response.status === 401) {
        const result = await response.json();
        setError("title", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid form field format", 
        });
       return
      }

      if(response.ok) {
        const result = await response.json();
        console.log('result', result)
        router.push("/admin/events");
        return alert('Event Updated successfully!');
      }

      alert('Failed to update event.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to update event.');
    } 
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8 bg-white shadow-lg container">
        <div className="py-4">
          <h3 className="font-bold text-xl sm:text-3xl">Update Event</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 mt-10">
          <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-12">
            <h3 className="text-xl font-semibold sm:col-span-6">Event Details</h3>

            <div className="sm:col-span-3">
              <label htmlFor="title" className="form-label">
                Event name *
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className="form-input"
              />
              {errors.title?.message && <p className="text-sm text-red-400">{errors.title.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="imageURL" className="form-label">
                Event image *
              </label>
              <ImageUploader id="imageURL" {...register('imageURL')}  />
              {errors.imageURL?.message && <p className="text-sm text-red-400">{errors.imageURL.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="startDate" className="form-label">
                Start date *
              </label>
              <input
                type="datetime-local"
                id="startDate"
                {...register('startDate')}
                className="form-input"
              />
              {errors.startDate?.message && <p className="text-sm text-red-400">{errors.startDate.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="endDate" className="form-label">
                End date <span className="text-gray-500 text-sm">( Ignore if event is a single day event )</span>
              </label>
              <input
                type="datetime-local"
                id="endDate"
                {...register('endDate')}
                className="form-input"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="tags" className="form-label">
                Event tags *
              </label>
              <input
                id="tags"
                type="text"
                {...register('tags')}
                className="form-input"
                placeholder="Conference, Tech"
              />
              {errors.tags?.message && <p className="text-sm text-red-400">{errors.tags.message}</p>}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="content" className="form-label">
                Event Description *
              </label>
              <textarea
                id="content"
                {...register('content')}
                className="form-input"
              />
              {errors.content?.message && <p className="text-sm text-red-400">{errors.content.message}</p>}
            </div>

            <hr className="sm:col-span-6" />
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:col-span-6">
              <h3 className="text-xl font-semibold sm:col-span-6">Event Price</h3>

              <div className="sm:col-span-3">
                <label htmlFor="entranceFee" className="form-label">
                  Ticket Price *
                </label>
                <input
                  id="entranceFee"
                  type="number"
                  {...register('entranceFee', { valueAsNumber: true })}
                  className="form-input"
                />
                {errors.entranceFee?.message && <p className="text-sm text-red-400">{errors.entranceFee.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="isFeatured" className="form-label">
                  Show in homepage
                </label>
                <select id="isFeatured" {...register('isFeatured')} className="form-input">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </section>

            <hr className="sm:col-span-6" />
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:col-span-6">
              <h3 className="text-xl font-semibold sm:col-span-6">Event Location</h3>

              <div className="sm:col-span-3">
                <label htmlFor="locationName" className="form-label">
                  Location name *
                </label>
                <input
                  id="locationName"
                  type="text"
                  {...register('locationName')}
                  className="form-input"
                />
                {errors.locationName?.message && <p className="text-sm text-red-400">{errors.locationName.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="city" className="form-label">
                  Location city *
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className="form-input"
                />
                {errors.city?.message && <p className="text-sm text-red-400">{errors.city.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="state" className="form-label">
                  Location state *
                </label>
                <input
                  id="state"
                  type="text"
                  {...register('state')}
                  className="form-input"
                />
                {errors.state?.message && <p className="text-sm text-red-400">{errors.state.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="postal_code" className="form-label">
                  Location zipcode
                </label>
                <input
                  id="postal_code"
                  type="text"
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="form-label">
                  Location address *
                </label>
                <input
                  id="address"
                  type="text"
                  {...register('address')}
                  className="form-input"
                />
                {errors.address?.message && <p className="text-sm text-red-400">{errors.address.message}</p>}
              </div>
            </section>
          </section>
        </div>

        <div className="py-6 flex justify-end">
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? 'Loading...' : 'Submit'}
            className="inline-flex w-72 py-3 text-white bg-primary text-base text-center hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          
          />
            
        </div>
      </form>
    </FormProvider>
  );
};

export default EditEvent;
