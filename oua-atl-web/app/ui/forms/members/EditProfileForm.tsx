"use client";

import { z } from "zod";
import { EditUserProfileSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserProfile } from "@/app/lib/types";

type Inputs = z.infer<typeof EditUserProfileSchema>;

const fieldMeta: Record<
  string,
  { label: string; className: string; placeholder?: string }
> = {
  // username: { label: "Username", className: "sm:col-span-2" },
  firstName: { label: "First name", className: "sm:col-span-3" },
  lastName: { label: "Last name", className: "sm:col-span-3" },
  phone: { label: "Phone number", className: "sm:col-span-3" },
  birthDate: {
    label: "Birthday (year-month-day)",
    className: "sm:col-span-3",
    placeholder: "YYYY-MM-DD",
  },
  studyField: { label: "Field of Study", className: "sm:col-span-3" },
  yearGraduated: {
    label: "Year Graduated",
    className: "sm:col-span-3",
    placeholder: "YYYY",
  },
  address: { label: "Street address", className: "col-span-full" },
  city: { label: "City", className: "sm:col-span-3" },
  zipCode: { label: "ZIP / Postal code", className: "sm:col-span-3" },
  hobbies: { label: "Hobbies", className: "col-span-full" },
  address2: { label: "Secondary address", className: "col-span-full" },
};

export default function EditProfileForm({ user }: { user: UserProfile }) {
  const router = useRouter();
  const date = new Date(user.birth_date);
  const birthDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      birthDate: birthDate,
      studyField: user?.field_of_study ?? "",
      yearGraduated: user?.graduation_year
        ? Number(user.graduation_year)
        : undefined,
      address: user.address,
      city: user.city,
      zipCode: `${user.zip_code}`,
      hobbies: user.hobbies,
      address2: user?.address2 ?? undefined,
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const response: Response = await fetch(`/api/members/${user.user_id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const result = await response.json().catch(() => ({message: response.statusText}));
        if (result?.message) {
          sessionStorage.setItem("flashMessage", "Update successful!");
          router.push("/members/profile");
        }
        return;
      }

      throw new Error(response.statusText ?? "Something went wrong");
    } catch (error: unknown) {
      toast.error("Server unavailable", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <section className="flex flex-col justify-between">
      {/* Form */}
      <form onSubmit={handleSubmit(processForm)}>
        <section className="mt-4">
          <div className="grid md:grid-cols-6 gap-x-3 gap-4">
            {/* Render fields based on the current step */}
            {Object.keys(fieldMeta).map((field) => (
              <div key={field} className={`${fieldMeta?.[field]?.className}`}>
                <label htmlFor={field} className="form-label capitalize">
                  {fieldMeta?.[field]?.label}
                </label>
                <input
                  id={field}
                  type={`${
                    ["password", "confirm_password"].includes(field)
                      ? "password"
                      : "text"
                  }`}
                  {...register(field as keyof Inputs)}
                  className="form-input"
                  autoComplete="off"
                  placeholder={fieldMeta?.[field]?.placeholder}
                />
                {errors[field as keyof Inputs]?.message && (
                  <p className="text-sm text-red-400">
                    {errors[field as keyof Inputs]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 pt-5 flex justify-between gap-3">
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Loading..." : "Update"}
            className="w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
}
