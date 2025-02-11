'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { ExecutiveSchema } from "@/app/lib/schema"; 
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { useRouter } from "next/navigation"; 

type ExecutiveFormValues = z.infer<typeof ExecutiveSchema>;
const CreateExecutiveForm = () => {
  const router = useRouter();
  const methods = useForm<ExecutiveFormValues>({
    resolver: zodResolver(ExecutiveSchema),
    // defaultValues: {
    //   createdBy: userId,
    // },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods

  const onSubmit = async (data: ExecutiveFormValues) => {
    console.log("Submitted data:", data);
    try {
      console.log('Form Errors:', errors);
      console.log('Form Data:', data);
      // Send data to your backend
      const response: Response = await fetch('/api/admin/members/executive', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
    });

      console.log('event response', response)

      if(response.status === 401) {
        const result = await response.json().catch(() => ({message: response.statusText}));
        setError("fullName", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid form field format", 
        });
       return
      }

      if(response.ok) {
        const result = await response.json().catch(() => ({message: response.statusText}));
        console.log('result', result)
        router.push("/admin/members");
        return alert('Executive created successfully!');
      }

      alert('Failed to create project.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create executive.');
    } 
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6"
      >
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h3 className="text-xl font-semibold sm:col-span-6">Executive Details</h3>

          <div className="sm:col-span-3">
            <label htmlFor="fullName" className="form-label">
              Full name *
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="form-input"
            />
            {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="imageUrl" className="form-label">
              Profile picture *
            </label>
            <ImageUploader
              id="imageUrl"
              {...register('imageUrl')}
            />
            {errors.imageUrl && <p className="text-sm text-red-400">{errors.imageUrl.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="studyField" className="form-label">
              Course of Study *
            </label>
            <input
              id="studyField"
              type="text"
              {...register("studyField")}
              className="form-input"
            />
            {errors.studyField && <p className="text-sm text-red-400">{errors.studyField.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="yearGraduated" className="form-label">
              Graduating year *
            </label>
            <input
              id="yearGraduated"
              type="number"
              {...register("yearGraduated")}
              className="form-input"
            />
            {errors.yearGraduated && <p className="text-sm text-red-400">{errors.yearGraduated.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              id="email"
              type="text"
              {...register("email")}
              className="form-input"
            />
            {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="positionAssigned" className="form-label">
              Position assigned *
            </label>
            <input
              id="positionAssigned"
              type="text"
              {...register("positionAssigned")}
              className="form-input"
            />
            {errors.positionAssigned && <p className="text-sm text-red-400">{errors.positionAssigned.message}</p>}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="bioSummary" className="form-label">
              Bio Summary *
            </label>
            <input
              id="bioSummary"
              type="text"
              {...register("bioSummary")}
              className="form-input"
            />
            {errors.bioSummary && <p className="text-sm text-red-400">{errors.bioSummary.message}</p>}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="fullSummary" className="form-label">
              Full Summary
            </label>
            <textarea
              id="fullSummary"
              {...register("fullSummary")}
              className="form-input"
            />
            {errors.fullSummary && <p className="text-sm text-red-400">{errors.fullSummary.message}</p>}
          </div>
        </section>

        <div className="py-6 flex justify-end">
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Loading..." : "Submit"}
            className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateExecutiveForm;
