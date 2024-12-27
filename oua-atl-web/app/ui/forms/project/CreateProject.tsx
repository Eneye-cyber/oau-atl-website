'use client';
import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { useRouter } from "next/navigation"; 
import { CreateProjectSchema } from "@/app/lib/schema"
import ProjectCard from '@/components/ProjectCard';

type ProjectFormData = z.infer<typeof CreateProjectSchema>;
const CreateProject = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false); // State to toggle preview mode
  const [formData, setFormData] = useState<ProjectFormData | null>(null); // State to hold form data for preview

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(CreateProjectSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    trigger
  } = methods
  
  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {

    try {

      // Send data to your backend
      const response: Response = await fetch('/api/admin/projects', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
    });

      if(response.status === 401) {
        const result = await response.json();
        setError("projectTitle", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid form field format", 
        });
       return
      }

      if(response.ok) {
        const result = await response.json();
        console.log('result', result)
        router.push("/admin/projects");
        return alert('Project created successfully!');
      }

      alert('Failed to create project.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create project.');
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
      { !isPreview ? (
        <form className="p-4 md:p-8 bg-white shadow-lg container" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <h3 className="font-bold text-xl sm:text-3xl">Create Project</h3>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <h3 className="text-xl font-semibold sm:col-span-6">Project Details</h3>

              <div className="sm:col-span-3">
                <label htmlFor="projectTitle" className="form-label">
                  Project Name *
                </label>
                <input
                  id="projectTitle"
                  type="text"
                  {...register('projectTitle')}
                  className="form-input"
                />
                {errors.projectTitle?.message && <p className="text-sm text-red-400">{errors.projectTitle.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="imageURL" className="form-label">
                  Project Image *
                </label>
                <ImageUploader
                  id="imageURL"
                  {...register('imageURL')}
                />
                {errors.imageURL?.message && <p className="text-sm text-red-400">{errors.imageURL.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="amountGoal" className="form-label">
                  Project Financial Goal *
                </label>
                <input
                  id="amountGoal"
                  type="number"
                  {...register('amountGoal')}
                  className="form-input"
                />
                {errors.amountGoal?.message && <p className="text-sm text-red-400">{errors.amountGoal.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="deadline" className="form-label">
                  Deadline *
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  {...register('deadline')}
                  className="form-input"
                />
                {errors.deadline?.message && <p className="text-sm text-red-400">{errors.deadline.message}</p>}
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="projectText" className="form-label">
                  Project Description *
                </label>
                <textarea
                  id="projectText"
                  {...register('projectText')}
                  className="form-input"
                />
                {errors.projectText?.message && <p className="text-sm text-red-400">{errors.projectText.message}</p>}
              </div>
            </section>

            <hr className="sm:col-span-6" />
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:col-span-6">
              <h3 className="text-xl font-semibold sm:col-span-6">Project Location</h3>

              <div className="sm:col-span-3">
                <label htmlFor="city" className="form-label">
                  Location City *
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
                  Location State *
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
                <label htmlFor="postalCode" className="form-label">
                  Location Postal Code *
                </label>
                <input
                  id="postalCode"
                  type="text"
                  {...register('postalCode')}
                  className="form-input"
                />
                {errors.postalCode?.message && <p className="text-sm text-red-400">{errors.postalCode.message}</p>}
              </div>
            </section>
          </div>

          <div className="py-6 flex justify-end gap-4">
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
              value={isSubmitting ? 'Loading...' : "Submit"}
              className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            />
          </div>
        </form>

      ) : (
        <div className="p-4 md:p-8 bg-white shadow-lg container">
          <div className="py-4">
            <h3 className="font-bold text-xl sm:text-3xl">Preview Project</h3>
          </div>

          <div className="md:py-8 text-center">
            <h2 className="text-3xl md:text-5xl font-semibold">{formData?.projectTitle}</h2>
            <div className="inline-block capitalize relative mt-1">{`${formData?.city} ${formData?.state}`}</div>

          </div>

          <ProjectCard
            project={{image_url: formData?.imageURL, project_text: formData?.projectText, amount_goal: formData?.amountGoal, amount_collected: 0, donation_count: 0}}
            percentage={0}
          />

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
      )

      }
    </FormProvider>
  )
}

export default CreateProject