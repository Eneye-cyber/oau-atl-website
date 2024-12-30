'use client';
import { z } from 'zod';
import { ContactFormDataSchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type Inputs = z.infer<typeof ContactFormDataSchema>;

const ContactForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      // Show success message and reset form
      toast.success(result.message)
      reset();
    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error('Backend error', { description: error?.message ?? 'Something went wrong'})
      }
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(processForm)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="fullName" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              required
              {...register('fullName')}
              autoComplete="fullName"
              className="form-input"
            />
            {errors.fullName?.message && <p className="text-sm text-red-400">{errors.fullName.message}</p>}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="form-label">
              Email address *
            </label>
            <input
              id="email"
              type="email"
              required
              {...register('email')}
              autoComplete="email"
              className="form-input"
            />
            {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject')}
              autoComplete="subject"
              className="form-input"
            />
            {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="message" className="form-label">
              Message *
            </label>
            <textarea id="message" required {...register('message')} className="form-input" />
            {errors.message?.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
          </div>
        </div>

        <div className="py-4">
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? 'Loading...' : 'Submit'}
            className="inline-flex w-full py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          />
        </div>
      </form>

     
    </div>
  );
};

export default ContactForm;
