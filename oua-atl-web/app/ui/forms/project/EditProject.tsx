"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/app/ui/forms/ImageUploader";
import { useRouter } from "next/navigation";
import { EditProjectSchema } from "@/app/lib/schema";
import ProjectCard from "@/components/ProjectCard";
import { ProjectResponseObject } from "@/app/lib/types";
import {  transformProjectFormObject } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

type ProjectFormData = z.infer<typeof EditProjectSchema>;
const EditProject = ({
  project,
  id,
}: {
  project: ProjectResponseObject;
  id: string;
}) => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false); // State to toggle preview mode
  const [formData, setFormData] = useState<ProjectFormData | null>(null); // State to hold form data for preview

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      projectTitle: project.project_title,
      projectText: project.project_text,
      amountGoal: parseFloat(project.amount_goal), // Transform string to number
      imageURL: project.image_url,
      isFeatured: project.is_featured,
      deadline: new Date(project.deadline),
      locationData: {
        state: project.location.state,
        city: project.location.city,
        address: project?.location?.address ?? "",
        postalCode: "0000000"
      },
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = form;

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    try {
      // Transform the data before sending

      const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`;

      const response = await fetch(backendUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // If authentication is needed, include the Authorization header
          // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(data),
        credentials: "include", // Ensures cookies are included
      });

      if (response.status === 401) {
        const result = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        return;
      }

      if (response.ok) {
        const result = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        console.log("Update result:", result);
        toast.success("Update successful!", { description: result.message });
        router.push(`/admin/projects`);
        return;
      }

      toast.error("Failed to update project.", {
        description: response.statusText,
      });
    } catch (error) {
      toast.error("Failed to update project.", {
        description: (error as Error).message,
      });
    }
  };

  const handlePreview = async () => {
    const outputs = await trigger();
    if (!outputs) return;
    setFormData(watch()); // Capture current form data
    setIsPreview(true); // Enable preview mode
  };

  const handleEdit = () => {
    setIsPreview(false); // Switch back to edit mode
  };

  return (
    <Card className="w-full container">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Project</CardTitle>
        <CardDescription>
          Fill out the form below to update an existing fundraising project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          {!isPreview ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Project Title */}
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Description */}
                <FormField
                  control={form.control}
                  name="projectText"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount Goal */}
                <FormField
                  control={form.control}
                  name="amountGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Goal</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            {...field}
                            onChange={(e) => {
                              const value =
                                e.target.value === "" ? "0" : e.target.value;
                              field.onChange(Number.parseFloat(value));
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Deadline */}
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label htmlFor="imageURL" className="form-label">
                    Project image
                  </label>
                  <ImageUploader id="imageURL" {...form.register("imageURL")} />
                  {form.formState.errors.imageURL?.message && (
                    <p className="text-sm text-red-400">
                      {form.formState.errors.imageURL.message}
                    </p>
                  )}
                </div>

                {/* locationData Fields */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    locationData Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* State */}
                    <FormField
                      control={form.control}
                      name="locationData.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City */}
                    <FormField
                      control={form.control}
                      name="locationData.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="locationData.address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Postal Code */}
                    <FormField
                      control={form.control}
                      name="locationData.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 md:col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Project</FormLabel>
                        <FormDescription>
                          Mark this project as featured to highlight it on the
                          homepage
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreview}
                  disabled={isSubmitting}
                >
                  Preview Changes
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Project"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-4 md:p-8 bg-white shadow-lg container">
              <div className="py-4">
                <h3 className="font-bold text-xl sm:text-3xl">
                  Preview Project
                </h3>
              </div>

              <div className="md:py-8 text-center">
                <h2 className="text-3xl md:text-5xl font-semibold">
                  {formData?.projectTitle}
                </h2>
                <div className="inline-block capitalize relative mt-1">{`${formData?.locationData?.city} ${formData?.locationData?.state}`}</div>
              </div>

              <ProjectCard
                project={{
                  image_url: formData?.imageURL,
                  project_text: formData?.projectText,
                  amount_goal: formData?.amountGoal,
                  amount_collected: 0,
                  donation_count: 0,
                }}
                percentage={0}
              />

              <div className="py-6 flex justify-end space-x-4">
                <button
                  disabled={isSubmitting}
                  onClick={handleEdit}
                  className="inline-flex w-72 py-3 justify-center text-white bg-accent text-base text-center hover:bg-secondary-dark cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="inline-flex w-72 py-3 justify-center text-white bg-primary text-base text-center hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                >
                  Confirm and Submit
                </button>
              </div>
            </div>
          )}
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditProject;
