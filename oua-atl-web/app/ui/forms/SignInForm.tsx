'use client';
import { useEffect } from "react";
import Link from 'next/link';
import { z } from 'zod';
import { SignInFormDataSchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from "sonner";
import { useAuth } from "@/lib/contexts/AuthProvider";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE


type Inputs = z.infer<typeof SignInFormDataSchema>;

const SignInForm = ({ noRedirect = false, onLoginSuccess }: { noRedirect?: boolean; onLoginSuccess?: (user: any) => void }) => {
  const { login } = useAuth();

  useEffect(() => {
    const message = sessionStorage.getItem("flashMessage");
    if (message) {
      toast.success(message, {
        description: 'A verification mail has been sent to your mail',
      });
      sessionStorage.removeItem("flashMessage");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<Inputs>({
    resolver: zodResolver(SignInFormDataSchema)
  });

  const processForm: SubmitHandler<Inputs> = async (formData) => {
    try {
      const url = `${baseUrl}/users/auth/login`;
      const { data, error} = await login(url, formData); // Use login from AuthProvider
      if(error) throw error
      if(data)
      toast.success("Login successful");

      if (!noRedirect) {
        window.location.replace("/members/profile");
        return;
      }

      if (onLoginSuccess) {
        onLoginSuccess(data);
      }

    } catch (error: any) {
      console.error("Login error:", error);
      setError("email", { type: "server", message: error.message ?? error ?? "Invalid credentials" });
      setError("password", { type: "server", message: error.message ?? error ?? "Invalid credentials" });
      toast.error("Login failed", { description: error.message ?? error ?? "An error occurred" });
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="flex flex-col h-full">
      <h1 className="font-bold text-center text-lg pb-4 uppercase md:text-xl md:pb-8 lg:text-2xl">
        Log in
      </h1>

      <div className="py-4">
        <label htmlFor="email" className="font-semibold text-jet-black text-sm mb-2 block">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          required
          placeholder="Email address"
          autoComplete='email'
          className="border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light"
        />
        {errors.email?.message && <p className='text-sm text-red-400 capitalize'>{errors.email.message}</p>}
      </div>

      <div className="pb-4">
        <label htmlFor="password" className="font-semibold text-jet-black text-sm mb-2 block">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          required
          placeholder="*******"
          className="border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light"
        />
        <div className="flex items-center">
          {errors.password?.message && <p className='text-sm text-red-400'>{errors.password.message}</p>}
          <Link href="/auth/forgot-password" className="ml-auto font-semibold text-sm text-primary hover:text-primary-dark hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="py-4">
        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? 'Loading...' : "Log in"}
          className="inline-flex w-full py-3 text-white bg-primary font-semibold hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        />
      </div>
    </form>
  );
};

export default SignInForm;
