"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { useRouter } from "next/navigation"

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

const accountSchema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

const AccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
  });
  const { login } = useAuth();
  const router = useRouter()

  const processForm: SubmitHandler<AccountFormValues> = async (formData) => {
    try {
      const url = `/admins/auth/login`;
      const { data, error } = await login(url, formData); // Use login from AuthProvider
      if (error) throw error;

      if (data) {
        toast.success("Administrator login successful");
        // const newUrl =
        //   window.location.protocol + "//" + window.location.host + "/admin";
        // window.location.replace(newUrl);
        router.replace('/admin')
        return;
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("email", {
        type: "server",
        message: err.message ?? err ?? "Invalid credentials",
      });
      setError("password", {
        type: "server",
        message: err.message ?? err ?? "Invalid credentials",
      });
      toast.error("Login failed", {
        description: err.message ?? err ?? "An error occurred",
      });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(processForm)}
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Admin Login
        </h2>
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
          <label
            className="text-sm font-medium leading-none"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="flex h-10 w-full rounded-md border px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            id="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
