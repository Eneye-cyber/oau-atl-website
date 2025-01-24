'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { SignUpFormDataSchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Inputs = z.infer<typeof SignUpFormDataSchema>;

const steps = [
  {
    id: 'Step 1',
    name: 'Account Setup',
    fields: ['username', 'email', 'password', 'confirm_password'],
  },
  {
    id: 'Step 2',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'phone', 'birthDate', 'yearGraduated', 'studyField'],
  },
  {
    id: 'Step 3',
    name: 'Additional Information',
    fields: ['address', 'city', 'zipCode', 'hobbies', 'address2'],
  },
];

const fieldMeta: Record<string, { label: string; className: string; placeholder?: string }>  = {
  username: { label: "Username", className: "sm:col-span-2" },
  email: { label: "Email address", className: "sm:col-span-4" },
  password: { label: "Password", className: "sm:col-span-3", placeholder: '********'  },
  confirm_password: { label: "Confirm Password", className: "sm:col-span-3", placeholder: '********'  },
  firstName: { label: "First name", className: "sm:col-span-3" },
  lastName: { label: "Last name", className: "sm:col-span-3" },
  phone: { label: "Phone number", className: "sm:col-span-4" },
  birthDate: { label: "Birthday (year-month-day)", className: "sm:col-span-2", placeholder: 'YYYY-MM-DD' },
  studyField: { label: "Field of Study", className: "sm:col-span-4" },
  yearGraduated: { label: "Year Graduated", className: "sm:col-span-2", placeholder: 'YYYY' },
  address: { label: "Street address", className: "col-span-full" },
  city: { label: "City", className: "sm:col-span-2 sm:col-start-1" },
  zipCode: { label: "ZIP / Postal code", className: "sm:col-span-2" },
  hobbies: { label: "Hobbies", className: "col-span-full" },
  address2: { label: "Secondary address", className: "col-span-full" },
};

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpFormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: Response = await fetch('/api/members/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result?.message) {
          sessionStorage.setItem('flashMessage', 'Account created successfully!');
          router.push('/members/login');
        }
        return;
      }

      throw new Error(response.statusText ?? 'Something went wrong');
    } catch (error: unknown) {
      toast.error('Server unavailable', {
        description: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as (keyof Inputs)[], { shouldFocus: true });

    if (!isStepValid) {
      Object.entries(errors).forEach(([field, error]) => {
        toast.error(field, {
          description: error?.message ?? 'Invalid input value entered',
        });
      });
      return;
    }

    if (currentStep === steps.length - 1) {
      await handleSubmit(processForm)();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between">
      {/* Steps Navigation */}
      <nav aria-label="Progress">
        <ol role="list" className="flex space-x-2 md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-primary-light transition-colors border-t-4 pb-0 pl-0 pt-4">
                  <span className="text-sm font-medium text-primary-light transition-colors">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-primary-light border-t-4 pb-0 pl-0 pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-primary-light">{step.id}</span>
                  <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-gray-200 transition-colors border-t-4 pb-0 pl-0 pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">{step.id}</span>
                  <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form onSubmit={handleSubmit(processForm)}>
        <section className="mt-6 md:mt-12 py-6 md:py-12">
          <motion.div
            key={currentStep}
            initial={{ x: currentStep > 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="grid md:grid-cols-6 gap-x-3 gap-4">
              {/* Render fields based on the current step */}
              {steps[currentStep].fields.map((field) => (
                <div key={field} className={`${fieldMeta?.[field]?.className}`}>
                  <label htmlFor={field} className="form-label capitalize">
                    {fieldMeta?.[field]?.label}
                  </label>
                  <input
                    id={field}
                    type={`${['password', 'confirm_password'].includes(field) ? 'password' : 'text'}`}
                    {...register(field as keyof Inputs)}
                    className="form-input"
                    autoComplete="off"
                    placeholder={fieldMeta?.[field]?.placeholder}
                  />
                  {errors[field as keyof Inputs]?.message && (
                    <p className="text-sm text-red-400">{errors[field as keyof Inputs]?.message}</p>
                  )}
                </div>
              ))}

            </div>
          </motion.div>
        </section>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-5 flex justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded w-full sm:w-fit bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-primary-light shadow-sm ring-1 ring-inset ring-primary-light hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? 'Loading...' : 'Register'}
              className="w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black cursor-pointer"
            />
          )}
        </div>
      </form>
    </section>
  );
}
