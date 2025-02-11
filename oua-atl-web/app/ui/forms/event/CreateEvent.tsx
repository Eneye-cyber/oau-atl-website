/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { useRouter } from "next/navigation"; 
import { CreateEventSchema } from "@/app/lib/schema";
import { formatEventDates, formatEventTimes } from "@/lib/utils";
import { ClockIcon, MapPinIcon, TicketIcon } from "@/app/ui/Icons"
import { toast } from 'sonner';

type EventFormData = z.infer<typeof CreateEventSchema>;


const CreateEvent = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false); // State to toggle preview mode
  const [formData, setFormData] = useState<EventFormData | null>(null); // State to hold form data for preview

  const methods = useForm<EventFormData>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      imageUrl: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    trigger
  } = methods;

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    try {
      const response: Response = await fetch('/api/admin/events', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        toast.success('Event created successfully!');
        router.push("/admin/events");
        
      } else {
        const result = await response.json().catch(() => ({message: response.statusText}));
        setError("title", {
          type: "server",
          message: result.message || "Invalid form field format",
        });
        throw new Error(`${response.status} - ${result.message}`)
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Backend Error', { description: (err as Error)?.message })
    }
  };

  const handlePreview = async () => {
    const outputs = await trigger()
    if(!outputs) return
    setFormData(watch()); // Capture current form data
    setIsPreview(true); // Enable preview mode
  };

  const handleEdit = () => {
    setIsPreview(false); // Switch back to edit mode
  };

  return (
    <FormProvider {...methods}>
      {!isPreview ? (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8 bg-white shadow-lg container">
          <div className="py-4">
            <h3 className="font-bold text-xl sm:text-3xl">Create Event</h3>
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
                <label htmlFor="imageUrl" className="form-label">
                  Event image *
                </label>
                <ImageUploader id="imageUrl" {...register('imageUrl')} />
                {errors.imageUrl?.message && <p className="text-sm text-red-400">{errors.imageUrl.message}</p>}
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
                  Ticket Price ($)*
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

          <div className="py-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex w-72 py-3 justify-center text-white bg-accent text-base text-center hover:bg-secondary-dark cursor-pointer"
            >
              Preview
            </button>
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? 'Loading...' : 'Submit'}
              className="inline-flex w-72 py-3 text-white bg-primary text-base text-center hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            />
          </div>
        </form>
      ) : (
        <div className="p-4 md:p-8 bg-white shadow-lg container">
          <div className="py-4">
            <h3 className="font-bold text-xl sm:text-3xl">Preview Event</h3>
          </div>

          <div className="w-full mx-auto py-6 sm:py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={formData?.imageUrl ?? "/img/placeholder.svg"}
                  alt={formData?.title}
                  width="700"
                  height="500"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "700/500", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                  <div className="flex gap-2">
                    {/* {formData?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary text-primary-foreground">{tag}</Badge>
                    ))}
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      Tech
                    </Badge> */}
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{formData?.title}</h1>
                <p className="text-muted-foreground text-lg sm:text-xl">{ (formData?.startDate, formData?.endDate) && formatEventDates(formData?.startDate, formData?.endDate)}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <ClockIcon className="h-5 w-5" />
                  <span>{(formData?.startDate, formData?.endDate) && formatEventTimes(formData?.startDate, formData?.endDate)}</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <MapPinIcon className="h-5 w-5 mt-0.5" />
                  <span>{`${formData?.locationName}, ${formData?.address}, ${formData?.city}, ${formData?.state}` }</span>
                </div>
                <div className="flex items-start space-x-2 text-muted-foreground">
                  <TicketIcon className="h-5 w-5" />
                  <span>Ticket Price: ${formData?.entranceFee}</span>
                </div>
              </div>
              <div className="prose text-muted-foreground">
                <p>
                  {formData?.content}
                </p>  
              </div>

            </div>
            </div>
          </div>


          <div className="py-6 flex justify-end space-x-4">
            <button
              onClick={handleEdit}
              className="inline-flex w-72 py-3 justify-center text-white bg-accent text-base text-center hover:bg-secondary-dark cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="inline-flex w-72 py-3 justify-center text-white bg-primary text-base text-center hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              Confirm and Submit
            </button>
          </div>
        </div>
      )}
    </FormProvider>
  );
};

export default CreateEvent;
