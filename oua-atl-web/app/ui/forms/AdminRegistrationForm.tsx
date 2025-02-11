'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 

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
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema)
  });

  useEffect(() => {
    async function fetchRole() {
      setIsLoading(true);
      const response = await fetch('/api/user');
      const data = await response.json();
      setRole(data.role);
      if(data.role === 'admin') {
        setValue('s_username', 'oaa_superuser_0')
        setValue('s_password', 'isnaklpsjiofjaksfaiofoijasofsakofhioshojsafnasfklshfsjiofh')
      }
    }
    fetchRole().catch(e => console.error(e)).finally(() => setIsLoading(false));
  }, [setValue]);

  const processForm: SubmitHandler<AccountFormValues> = async (data) => {
    try {
      const response: Response = await fetch('/api/admin/register', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
    });

      if(response.status === 401) {
        const result = await response.json();
        setError("email", { type: "server", message: result.message || "Invalid credentials" });
        setError("password", { type: "server", message: result.message || "Invalid credentials" });
        return;
      }

      if(response.ok) {
        const result = await response.json();
        if(!role) {
          return router.push("/admin/login");
        }


        return alert('Admin user created successfully');
      }
  
    } catch (err) {
      alert('Server unavailable');
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(processForm)}
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold leading-none tracking-tight">Admin Registration</h2>
        <p className="text-sm text-muted-foreground">
          This login page is strictly for website administrators.
        </p>
      </div>

      <div className="gap-x-2 gap-y-4 grid md:grid-cols-2">
        {['firstName', 'lastName', 'email', 'password', 'username', 's_username', 's_password',].map((field, index) => (
          <div key={index} className={`${(['firstName', 'lastName', 'password', 'username' ].includes(field)) ? 'md:col-span-1' : 'md:col-span-2'}`} >
            <label
              className="text-sm font-medium leading-none"
              htmlFor={field}
            >
              {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
            </label>
            <input
              type={field === 'password' || field === 's_password' ? 'password' : 'text'}
              {...register(field as keyof AccountFormValues)}
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              id={field}
              disabled={isLoading || isSubmitting}
              aria-disabled={isLoading || isSubmitting}
            />
            {errors[field as keyof AccountFormValues] && (
              <p className="text-sm text-red-500 mt-1">{errors[field as keyof AccountFormValues]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="inline-flex items-center w-full justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Loading...' : "Register"}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
