'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { SignUpFormDataSchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation"; 

type Inputs = z.infer<typeof SignUpFormDataSchema>
interface Result {
  "message": string;
}
const steps = [
  {
    id: 'Step 1',
    name: 'Account Setup',
    fields: ['username', 'email', 'password', 'confirm_password'],
  },
  {
    id: 'Step 2',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'yearGraduated', 'studyField'], 
  },
  {
    id: 'Step 3',
    name: 'Additional Information',
    fields: ['address', 'city', 'zipCode'], 
  },
];

export default function SignUpForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpFormDataSchema)
  })
  const closeDialog = () => {
    if(errorMessage) {
      setErrorMessage(null);
      setSuccessMessage(null);
      return
    }
    router.push("/members/login");
  }

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log('start')
      const response: Response = await fetch('/api/members/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // console.log('response', response)
      if(response.status === 200) {
        const result: Result = await response.json();
        console.log('result', result);
      // reset()
        setErrorMessage(null);
        setSuccessMessage(result.message ?? 'Sign up successful');
        return
      }
      
      console.log('result', response.statusText);
      throw new Error(response.statusText ?? "Something went wrong")
      
    } catch (error: any) {
      console.error(error)
      setSuccessMessage(null);
      setErrorMessage(error.message ?? 'An error occurred');

    }
  }

  type FieldName = keyof Inputs


  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    console.log(output)
    if (!output) {
      console.log(errors); // Log errors for debugging.
      return;
    }
    console.log('log',errors); // Log errors for debugging.

    console.log(currentStep, steps.length)
    if (currentStep === steps.length - 1) {
      console.log('handle submit')
      await handleSubmit(processForm)()
      return;
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className="flex flex-col justify-between ">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="flex space-x-2 md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-primary-light transition-colors border-t-4 pb-0 pl-0 pt-4">
                  <span className="sm:inline text-sm font-medium text-primary-light transition-colors ">{step.id}</span>
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
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">Account Setup</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Set up your account details to access our services</p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input type="text" id="username" {...register("username")} autoComplete="off" className="form-input" />
                  {errors.username?.message && <p className="text-sm text-red-400">{errors.username.message}</p>}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input id="email" type="email" {...register("email")} autoComplete="email" className="form-input" />
                  {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" id="password" {...register("password")} autoComplete="new-password" className="form-input" />
                  {errors.password?.message && <p className="text-sm text-red-400">{errors.password.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <input type="password" id="confirm_password" {...register("confirm_password")} autoComplete="new-password" className="form-input" />
                  {errors.confirm_password?.message && <p className="text-sm text-red-400">{errors.confirm_password.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide us with your personal details to help us know you better.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input type="text" id="firstName" {...register("firstName")} autoComplete="given-name" className="form-input" />
                  {errors.firstName?.message && <p className="text-sm text-red-400">{errors.firstName.message}</p>}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input type="text" id="lastName" {...register("lastName")} autoComplete="family-name" className="form-input" />
                  {errors.lastName?.message && <p className="text-sm text-red-400">{errors.lastName.message}</p>}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input type="text" id="phone" {...register("phone")} autoComplete="tel" className="form-input" />
                  {errors.phone?.message && <p className="text-sm text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="birthday" className="form-label">
                    Birthday (Month/Day)
                  </label>
                  <input type="text" id="birthday" {...register("birthDate")} autoComplete="bday-month" className="form-input" />
                  {errors.birthDate?.message && <p className="text-sm text-red-400">{errors.birthDate.message}</p>}
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="field_of_study" className="form-label">
                    Field of Study
                  </label>
                  <input type="text" id="field_of_study" {...register("studyField")} autoComplete="on" className="form-input" />
                  {errors.studyField?.message && <p className="text-sm text-red-400">{errors.studyField.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="graduation_year" className="form-label">
                    Year Graduated
                  </label>
                  <input type="number" min="1966" max={new Date().getFullYear()} id="graduation_year" {...register("yearGraduated")} className="form-input" />
                  {errors.yearGraduated?.message && <p className="text-sm text-red-400">{errors.yearGraduated.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Additional Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Complete additional details to finish your profile.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="street" className="form-label">
                    Street address
                  </label>
                  <div>
                    <input type="text" id="street" {...register("address")} autoComplete="street-address" className="form-input" />
                    {errors.address?.message && <p className="text-sm text-red-400">{errors.address.message}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <div>
                    <input type="text" id="city" {...register("city")} autoComplete="city" className="form-input" />
                    {errors.city?.message && <p className="text-sm text-red-400">{errors.city.message}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zip" className="form-label">
                    ZIP / Postal code
                  </label>
                  <div>
                    <input type="text" id="zip" {...register("zipCode")} autoComplete="postal-code" className="form-input" />
                    {errors.zipCode?.message && <p className="text-sm text-red-400">{errors.zipCode.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="hobbies" className="form-label">
                    Hobbies
                  </label>
                  <div>
                    <input type="text" id="hobbies" {...register("hobbies")} autoComplete="on"  placeholder="Enter hobbies separated by commas" className="form-input" />
                    {errors.hobbies?.message && <p className="text-sm text-red-400">{errors.hobbies.message}</p>}
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="address2" className="form-label">
                    Secondary address
                  </label>
                  <div>
                    <input type="text" id="address2" {...register("address2")} autoComplete="secondary-address" className="form-input" />
                    {errors.address2?.message && <p className="text-sm text-red-400">{errors.address2.message}</p>}
                  </div>
                </div>
              </div>
            </>
          )}

        </section>


        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {
              currentStep !== steps.length - 1 &&
              (
                <button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="rounded bg-white px-2 py-1 text-sm font-semibold text-primary-light shadow-sm ring-1 ring-inset ring-primary-light hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              ) 
            }

            <input type="submit" onClick={next} disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Register"}  className={`${currentStep !== steps.length - 1 ? 'hidden' : 'inline-flex'} w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black cursor-pointer`} />
          </div>
        </div>
      </form>

      {/* Success Dialog */}
      {/* Success Dialog */}
      {(successMessage || errorMessage) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-64 text-center">
            <h2 className="text-lg font-bold text-green-600 capitalize">{successMessage ? successMessage : errorMessage}</h2>
            <button
              onClick={closeDialog}
              className="mt-4 px-6 py-1 bg-primary font-light text-white text-sm rounded hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}