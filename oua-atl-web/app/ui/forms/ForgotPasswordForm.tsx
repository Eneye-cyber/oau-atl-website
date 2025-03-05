'use client';
// import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation"; 
import { requestPasswordReset } from "@/lib/utils/api/auth"
import { toast } from 'sonner';
 
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

  const processForm: SubmitHandler<Inputs> =async (formData) => {
    try {
      const {result, error, message, code} = await requestPasswordReset(formData);
      if(error) {
        if(code === 401) {
          setError("email", {
            type: "server", // Custom type for server-side errors
            message: result?.message ?? message ?? "Email not recognized", 
          });
        }
        return toast.error('Failed to reset password', { description: message })
      }
      toast.success(result?.message ?? message, { description: 'Check your email for a password reset link' })
      router.push("/members/login")

    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error('Error', { description: error?.message ?? 'Something went wrong'})
      }
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