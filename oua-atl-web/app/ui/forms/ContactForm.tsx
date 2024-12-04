'use client';
import { z } from 'zod';
import { ContactFormDataSchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type Inputs = z.infer<typeof ContactFormDataSchema>;

const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

      if (!response.ok) throw new Error('Failed to submit form');

      const result = await response.json();
      console.log('result', result);

      // Show success message and reset form
      setSuccessMessage(result.message);
      reset();
    } catch (error) {
      alert('Server unavailable');
      console.error(error);
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

      {/* Success Dialog */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-64 text-center">
            <h2 className="text-lg font-bold text-green-600 capitalize">{successMessage}</h2>
            <button
              onClick={() => setSuccessMessage(null)}
              className="mt-4 px-6 py-1 bg-primary font-light text-white text-sm rounded hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
