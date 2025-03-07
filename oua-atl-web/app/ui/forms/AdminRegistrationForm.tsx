'use client';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { toast } from 'sonner';
import { signupAdmin } from '@/lib/utils/api/auth';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

const accountSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(2, "Username is required"),
  s_password: z.string().min(2, "S_password is required"),
  s_username: z.string().min(2, "S_username is required"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

const AccountForm = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { s_username: "", s_password: "" },
  });

  useEffect(() => {
    if (!loading && user?.role) {
      setValue("s_username", user.role === "admin" ? "oaa_superuser_0" : "");
      setValue(
        "s_password",
        user.role === "admin"
          ? "isnaklpsjiofjaksfaiofoijasofsakofhioshojsafnasfklshfsjiofh"
          : ""
      );
    }
  }, [user?.role, loading, setValue]);

  const processForm: SubmitHandler<AccountFormValues> = async (data) => {
    try {
      const { success, message } = await signupAdmin(data);
  
      if (!success) {
        setError("email", { type: "server", message: message || "Server error" });
        setError("password", { type: "server", message: message || "Server error" });
        return;
      }
  
      router.push(user?.role ? "/admin" : "/admin/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Admin Registration</h2>
        <p className="text-sm text-muted-foreground">This login page is strictly for website administrators.</p>
      </div>

      <div className="gap-x-2 gap-y-4 grid md:grid-cols-2">
        {[
          { name: "firstName", span: 1 },
          { name: "lastName", span: 1 },
          { name: "email", span: 2 },
          { name: "username", span: 1 },
          { name: "password", span: 1 },
          { name: "s_username", span: 2 },
          { name: "s_password", span: 2 },
        ].map(({ name, span }) => (
          <div key={name} className={`md:col-span-${span || 1}`}>
            <label className="text-sm font-medium" htmlFor={name}>{name.replace("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}</label>
            <input type={name.includes("password") ? "password" : "text"} {...register(name as keyof AccountFormValues)} className="flex h-10 w-full rounded-md border px-3 py-2" disabled={loading || isSubmitting} />
            {errors[name as keyof typeof errors] && <p className="text-sm text-red-500">{errors[name as keyof typeof errors]?.message}</p>}
          </div>
        ))}
      </div>

      <button type="submit" disabled={isSubmitting || loading} className="w-full h-10 bg-primary text-white rounded-md">
        {isSubmitting ? 'Loading...' : "Register"}
      </button>
    </form>
  );
};

export default AccountForm;
