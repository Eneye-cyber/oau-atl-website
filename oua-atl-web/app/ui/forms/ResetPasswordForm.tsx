'use client';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from "next/navigation"; 
import { ResetPasswordFormDataSchema } from '@/app/lib/schema'
 

type Inputs = z.infer<typeof ResetPasswordFormDataSchema>

const ResetPasswordForm = ({userId}: {userId: string}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError
  } = useForm<Inputs>({
    resolver: zodResolver(ResetPasswordFormDataSchema),
    defaultValues: {
      id: userId,
    },
  })

  const processForm: SubmitHandler<Inputs> =async (data) => {
    console.log(errors)
    try {
      const response: Response = await fetch('/api/members/reset-password', {
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
        reset()

       return
      }

  
      // console.log('result', result);
      
    } catch (err) {
      alert('Server unavailable')
    }
  }



  // type FieldName = keyof Inputs


  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col h-full" >
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 mb-4">
          <p>There are errors in your form. Please correct them below:</p>
        </div>
      )}
      <input type="text" {...register('id')} hidden />
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

      <div className="pb-4">
        <label htmlFor="password" className="font-semibold text-jet-black text-sm mb-2 block" >
          Old Password 
        </label>
        <input
          placeholder="*******"
          id="password"
          type="password"
          {...register('oldPassword')}
          required
          className="border rounded bg-gray-50 text-sm mb-3 w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light ng-untouched ng-pristine ng-invalid"
        />
        <div className="flex items-center">
          {errors.oldPassword?.message && (
            <p className=' text-sm text-red-400'>
              {errors.oldPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="pb-4">
        <label htmlFor="newPassword" className="font-semibold text-jet-black text-sm mb-2 block" >
          New Password 
        </label>
        <input
          placeholder="*******"
          id="newPassword"
          type="password"
          {...register('newPassword')}
          required
          className="border rounded bg-gray-50 text-sm mb-3 w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light ng-untouched ng-pristine ng-invalid"
        />
        <div className="flex items-center">
          {errors.newPassword?.message && (
            <p className=' text-sm text-red-400'>
              {errors.newPassword.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="py-4">
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Submit"} className="inline-flex w-full py-3 text-white bg-primary font-semibold hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
      </div>

      {isSubmitSuccessful && (
          <ol 
            className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
          >
            <li 
              role="status" 
              aria-live="off" 
              aria-atomic="true" 
              tabIndex={0} 
              data-state="open" 
              data-swipe-direction="right" 
              className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full border bg-background text-foreground" 
              data-radix-collection-item="" 
            >
              <div className="grid gap-1">
                <div className="text-sm opacity-90">Password changed successfully</div>
              </div>
              
            </li>
          </ol>
          )}

    </form>
  )
}

export default ResetPasswordForm