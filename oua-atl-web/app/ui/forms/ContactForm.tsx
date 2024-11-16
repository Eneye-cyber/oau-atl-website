'use client';
import { z } from 'zod'
import { ContactFormDataSchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof ContactFormDataSchema>

const ContactForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> =async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      console.log('response', response)
  
      const result = await response.json();
      console.log('result', result);
      reset()
      
    } catch (error) {
      alert('Server unavailable')
      console.log(error)
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(processForm)}>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="fullname" className="form-label">
            Full Name *
          </label>
          <input type="text" id="fullname" required {...register("fullname")} autoComplete="fullname" className="form-input" />
          {errors.fullname?.message && <p className="text-sm text-red-400">{errors.fullname.message}</p>}
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email" className="form-label">
            Email address *
          </label>
          <input id="email" type="email" required {...register("email")} autoComplete="email" className="form-input" />
          {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input id="subject" type="text" {...register("subject")} autoComplete="subject" className="form-input" />
          {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>}
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea id="message" required {...register("message")}  className="form-input" />
          {errors.message?.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
        </div>
      </div>

      <div className="py-4">
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Submit"} className="inline-flex w-full py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
      </div>
    </form>
  )
}

export default ContactForm