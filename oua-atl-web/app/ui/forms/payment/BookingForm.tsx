import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PaymentResponse, UserRoleResponse } from "@/app/lib/types";

interface User extends UserRoleResponse {
  email: string | null;
}

// Define Zod schema
const bookingFormSchema = z.object({
  paymentType: z.enum(['booking', 'donation', 'subscription']),
  ticketID: z.string().min(2, "Ticket ID is required"),
  userID: z.string().min(2, "User ID is required"),
  userEmail: z.string().email("Invalid email address"),
  amountAttempted: z
    .number({ required_error: "Amount is required" })
    .positive("Amount must be greater than zero"),
  quantityBooked: z.number({required_error: "This field is required"}).positive("Amount must be greater than zero")
});

type BookingFormSchema = z.infer<typeof bookingFormSchema>;

const BookingForm = ({
  ticketID,
  userID,
  userEmail,
  amountAttempted,
}: {
  ticketID: string;
  userID: string;
  userEmail: string;
  amountAttempted: number
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      ticketID, 
      userID,
      userEmail,
      amountAttempted, 
      quantityBooked: 1,
      paymentType: 'booking'
    },
  });

  const processPaymentUrl = async (data: BookingFormSchema) => {
    const totalPrice = data.quantityBooked * data.amountAttempted
    const body = {
      ...data, 
      amountAttempted: totalPrice,
      ticketID: "1" // Change to this when the backend fixes the booking input
    }
    try {
      const response: Response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body)
      });

      const result: PaymentResponse = await response.json().catch(() => ({message: response.statusText}));

      if (result?.payload?.approvalUrl?.startsWith("http")) {
        window.location.href = result.payload.approvalUrl;
      } else {
        toast.error(result.message ?? "Invalid approval URL returned from the server");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Payment gateway error", {
          description: error.message,
        });
      } else {
        toast.error("Payment gateway error", {
          description: "Something went wrong",
        });
      }
    }
  };

  const onSubmit = async (data: BookingFormSchema) => {
    await processPaymentUrl(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("paymentType")} type="hidden" />
      {errors.paymentType && (
                <p className="text-red-500 text-sm">{errors.paymentType.message}</p>
              )}
      <input {...register("ticketID")} type="hidden" />
      {errors.ticketID && (
                <p className="text-red-500 text-sm">{errors.ticketID.message}</p>
              )}
      <input {...register("userID")} type="hidden" />
      {errors.userID && (
                <p className="text-red-500 text-sm">{errors.userID.message}</p>
              )}
      <input {...register("userEmail")} type="hidden" />
      {errors.userEmail && (
                <p className="text-red-500 text-sm">{errors.userEmail.message}</p>
              )}
      <input {...register("amountAttempted", { valueAsNumber: true })} type="hidden" />
            {errors.amountAttempted && (
                <p className="text-red-500 text-sm">{errors.amountAttempted.message}</p>
              )}

      <div>
        <Label htmlFor="quantityBooked">No of tickets (<span className="">Maximum of 5 tickets per purchase</span>)</Label>
        <Input
          id="quantityBooked"
          type="number"
          step="1"
          min={1}
          max={5}
          {...register("quantityBooked", { valueAsNumber: true })}
          placeholder="Enter number of ticket you wish to purchase"
        />
        {errors.quantityBooked && (
          <p className="text-red-500 text-sm">{errors.quantityBooked.message}</p>
        )}

        
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light disabled:opacity-40"
      >
        {isSubmitting ? "Processing" : "Make payment"}
      </button>
    </form>
  );
};

export default BookingForm;
