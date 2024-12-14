'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 

const accountSchema = z.object({
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

const AccountForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema)
  });

  const processForm: SubmitHandler<AccountFormValues> = async (data) => {
    try {
      const response: Response = await fetch('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
    });

      console.log('response', response)

      if(response.status === 401) {
        const result = await response.json();
        setError("email", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid credentials", 
        });
        setError("password", {
          type: "server", // Custom type for server-side errors
          message: result.message || "Invalid credentials", 
        });
  
       return
      }

      if(response.ok) {
        const result = await response.json();
        console.log('result', result)
        router.push("/admin");
      }
  
    } catch (err) {
      alert('Server unavailable')
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(processForm)}
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold leading-none tracking-tight">Admin Login</h2>
        <p className="text-sm text-muted-foreground">
          This login page is strictly for website administrators.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Loading...' : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
