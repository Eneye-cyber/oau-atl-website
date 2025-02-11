'use client';
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation"; 
 
const FogotPasswordFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

type Inputs = z.infer<typeof FogotPasswordFormDataSchema>

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError
  } = useForm<Inputs>({
    resolver: zodResolver(FogotPasswordFormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> =async (data) => {
    try {
      const response: Response = await fetch('/api/members/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
    });

      console.log('response', response)

      if(response.status === 401) {
        const result = await response.json().catch(() => ({message: response.statusText}));
        setError("email", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid credentials", 
        });
       return
      }

      if(response.status === 200) {
        const result = await response.json().catch(() => ({message: response.statusText}));
        console.log(result, result)
        router.push("/members/login")
       return
      }

  
      // console.log('result', result);
      // reset()
      
    } catch (err) {
      alert('Server unavailable')
    }
  }



  // type FieldName = keyof Inputs


  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col h-full" >
      <h1 className="font-bold text-center text-lg pb-4 uppercase md:text-xl md:pb-8 lg:text-2xl">
        Forgot Password
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
          autoComplete='email'
          className="border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light ng-untouched ng-pristine ng-invalid"
        />
        {errors.email?.message && (
          <p className=' text-sm text-red-400 capitalize'>
            {errors.email.message}
          </p>
        )}
      </div>

      
      <div className="py-4">
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Submit"} className="inline-flex w-full py-3 text-white bg-primary font-semibold hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
      </div>
    </form>
  )
}

export default ForgotPasswordForm