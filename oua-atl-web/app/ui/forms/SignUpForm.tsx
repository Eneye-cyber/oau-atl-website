'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { SignUpFormDataSchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof SignUpFormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Account Setup',
    fields: ['username', 'email', 'password', 'confirm_password']
  },
  {
    id: 'Step 2',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email', 'phone', 'birthday', 'graduation_year', 'field_of_study', 'interests', ]
  },
  { 
    id: 'Step 3', 
    name: 'Additional Information',
    fields: ['address', 'address2', 'city', 'state', 'zip', 'country', 'availability', 'referral_story']

  }
]

export default function SignUpForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpFormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }
  type FieldName = keyof Inputs


  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
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
      <form className="mt-6 md:mt-12 py-6 md:py-12" onSubmit={handleSubmit(processForm)}>
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
                <input type="text" id="username" {...register("username")} autoComplete="username" className="form-input" />
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
                <input type="password" id="password" {...register("password")} autoComplete="family-name" className="form-input" />
                {errors.password?.message && <p className="text-sm text-red-400">{errors.password.message}</p>}
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input type="password" id="confirm_password" {...register("confirm_password")} className="form-input" />
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
                <input type="text" id="phone" {...register("phone")} autoComplete="given-number" className="form-input" />
                {errors.phone?.message && <p className="text-sm text-red-400">{errors.phone.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="birthday" className="form-label">
                  Birthday (Month/Day)
                </label>
                <input type="text" id="birthday" {...register("birthday")} autoComplete="birthday" className="form-input" />
                {errors.birthday?.message && <p className="text-sm text-red-400">{errors.birthday.message}</p>}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="field_of_study" className="form-label">
                  Field of Study
                </label>
                <input type="text" id="field_of_study" {...register("field_of_study")} autoComplete="given-field" className="form-input" />
                {errors.field_of_study?.message && <p className="text-sm text-red-400">{errors.field_of_study.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="graduation_year" className="form-label">
                  Year Graduated
                </label>
                <input type="text" id="graduation_year" {...register("graduation_year")} className="form-input" />
                {errors.graduation_year?.message && <p className="text-sm text-red-400">{errors.graduation_year.message}</p>}
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
                  <input type="text" id="city" {...register("city")} autoComplete="address-level2" className="form-input" />
                  {errors.city?.message && <p className="text-sm text-red-400">{errors.city.message}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="zip" className="form-label">
                  ZIP / Postal code
                </label>
                <div>
                  <input type="text" id="zip" {...register("zip")} autoComplete="postal-code" className="form-input" />
                  {errors.zip?.message && <p className="text-sm text-red-400">{errors.zip.message}</p>}
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
      </form>

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
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-primary-light shadow-sm ring-1 ring-inset ring-primary-light hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  )
}