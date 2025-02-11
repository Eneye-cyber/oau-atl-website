'use client';
import { z } from 'zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import MultipleImageUploader from "./../ui/MultipleImageUploader"
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation"; 
import { toast } from 'sonner';

const validationSchema = z.object({
  urls: z
    .array(z.string().url()) // Ensure 'urls' is an array of valid URLs
    .nonempty("At least one URL is required."), // Optionally enforce at least one URL
  groupData: z.object({
    title: z
      .string()
      .min(1, "Title is required.") // Ensure 'title' is a non-empty string
      .max(100, "Title must not exceed 100 characters."), // Optional length constraint
    imageUrl: z
      .string()
      .min(1, "Image URL is required.") // Ensure it's a non-empty string
      .url("Image URL must be valid."), // Enforce valid URL format
  }),
});

type GalleryFormData = z.infer<typeof validationSchema>;
const Page = () => {
  const router = useRouter();
  const methods = useForm<GalleryFormData>({
    resolver: zodResolver(validationSchema)
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    try {
      const response: Response = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        router.push("/admin/gallery");
        toast.success('Gallery created successfully!');
      } else {
        const result = await response.json().catch(() => ({message: response.statusText}));
        setError("groupData.title", {
          type: "server",
          message: result.message || "Invalid form field format",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create formData?.');
    }

    
  };
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 mb-4">
          <p>There are errors in your form. Please correct them below:</p>
          {Object.values(errors).map((item, index) => <p key={index}>{item.message}</p>)}
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 flex flex-col'>
          <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 flex-1">
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
              <h3 className="text-xl font-semibold sm:col-span-6">Update album</h3>
              <div className="border border-slate-200 sm:col-span-6"></div>
              <div className="sm:col-span-3">
                <label htmlFor="location" className="form-label">
                  Album name *
                </label>
                <input id="name"  {...register('groupData.title')} type="text" required className="form-input" />
                {errors.groupData?.title?.message && <p className="text-sm text-red-400">{errors.groupData.title.message}</p>}
                </div>

              <div className="sm:col-span-3">
                <label htmlFor="imageUrl" className="form-label">
                  Album cover image
                </label>
                <ImageUploader id="imageUrl" {...register('groupData.imageUrl')} />
                {errors.groupData?.imageUrl?.message && <p className="text-sm text-red-400">{errors.groupData.imageUrl.message}</p>}
              </div>

            </section>
            <MultipleImageUploader id="urls" {...register('urls')} />

            
          </section>

          <div className="py-6 flex justify-end">
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Update"} className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
          </div>

        </form>

      </FormProvider>

    </article>
  )
}

export default Page