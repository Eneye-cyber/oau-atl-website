'use client';
import Link from 'next/link'
import { z } from 'zod'
import { SignInFormDataSchema } from '@/app/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof SignInFormDataSchema>

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(SignInFormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> =async (data) => {
    try {
      const response = await fetch('/api/members/auth', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      console.log('response', response)
  
      const result = await response.json();
      console.log('result', result);
      reset()
      
    } catch (error) {
      alert('Server unavailable')
    }
  }

  // type FieldName = keyof Inputs


  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col h-full" >
      <h1 className="font-bold text-center text-lg pb-4 uppercase md:text-xl md:pb-8 lg:text-2xl">
        Log in
      </h1>
      <div className="py-4">
        <label htmlFor="email" className="font-semibold text-jet-black text-sm mb-2 block" >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          required
          placeholder="Email address"
          className="border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light ng-untouched ng-pristine ng-invalid"
        />
        {errors.email?.message && (
          <p className=' text-sm text-red-400'>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="pb-4">
        <label htmlFor="password" className="font-semibold text-jet-black text-sm mb-2 block" >
          Password 
        </label>
        <input
          placeholder="*******"
          id="password"
          type="password"
          {...register('password')}
          required
          className="border rounded bg-gray-50 text-sm mb-3 w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light ng-untouched ng-pristine ng-invalid"
        />
      <div className="flex items-center">
        {errors.password?.message && (
          <p className=' text-sm text-red-400'>
            {errors.password.message}
          </p>
        )}
        <Link
          href="/forgot-password"
          className="ml-auto font-semibold text-sm text-primary inline-block align-baseline hover:text-primary-dark hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      </div>

      <div className="py-4">
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Log in"} className="inline-flex w-full py-3 text-white bg-primary font-semibold hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
      </div>
    </form>
  )
}

export default SignInForm