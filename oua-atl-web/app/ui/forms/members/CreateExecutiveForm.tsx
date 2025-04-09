"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner';
import type { ExecutiveUserProps } from "@/app/ui/cards/executive-card"
import ImageUploader from '@/app/ui/forms/ImageUploader';
import { useRouter } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Ensure it's accessible on client-side

interface ExecutiveFormProps {
  executiveData: ExecutiveUserProps
  setExecutiveData: (data: ExecutiveUserProps) => void
}

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studyField: z.string().min(1, { message: "Study field is required." }),
  yearGraduated: z.coerce.number().int().min(1900).max(new Date().getFullYear()),
  bioSummary: z.string().min(10, { message: "Bio summary must be at least 10 characters." }),
  positionAssigned: z.string().min(1, { message: "Position is required." }),
  fullSummary: z.string().min(20, { message: "Full summary must be at least 20 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  isActive: z.boolean(),
})

export default function CreateExecutiveForm({ executiveData, setExecutiveData }: ExecutiveFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: executiveData,
  })


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("Submitted data:", data);s
    setIsSubmitting(true)
    try {
      const url = `${baseUrl}/executives`;
      console.log("Sending request to:", url);
  
      const response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Ensures cookies are sent
      });
  

  
      if (response.ok) {
        const result = await response.json();
        toast.success("Executive form submitted successfully!", {description: result.message});
        router.push("/admin/members/executive");
        return;
      }
  
      const result = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(result.message)
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create executive.", {description: (error as Error)?.message ?? 'Something went wrong'});
    } finally {
      setIsSubmitting(false)

    }
  };

  // Update preview in real-time as form values change
  const handleChange = (field: keyof ExecutiveUserProps, value: any) => {
    setExecutiveData({
      ...executiveData,
      [field]: value,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleChange("fullName", e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleChange("email", e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studyField"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Computer Science"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("studyField", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearGraduated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Graduated</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("yearGraduated", Number.parseInt(e.target.value))
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="positionAssigned"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Assigned</FormLabel>
              <FormControl>
                <Input
                  placeholder="Technical Director"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleChange("positionAssigned", e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bioSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief professional summary..."
                  className="resize-none"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleChange("bioSummary", e.target.value)
                  }}
                />
              </FormControl>
              <FormDescription>A short summary that appears in listings</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed professional background..."
                  className="resize-none min-h-[120px]"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    handleChange("fullSummary", e.target.value)
                  }}
                />
              </FormControl>
              <FormDescription>Detailed biography for the executive&apos;s profile page</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>

              <ImageUploader  {...field} onChange={(e) => {
                    console.log(e,  e.target.value)
                    handleChange("imageUrl", e.target.value)
                  }} />
              </FormControl>
              <FormDescription>Link to the executive&apos;s profile photo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <FormDescription>Whether this executive is currently active</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    handleChange("isActive", checked)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Executive User"}
        </Button>
      </form>
    </Form>
  )
}
