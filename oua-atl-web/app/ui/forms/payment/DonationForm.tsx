import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserRoleResponse } from "@/app/lib/types";
import { processPayment } from "@/lib/utils/api/payment";

interface User extends UserRoleResponse {
  email: string | null;
}

// Define Zod schema
const donationFormSchema = z.object({
  paymentType: z.enum(['booking', 'donation', 'subscription']),
  projectID: z.string().min(2, "Project ID is required"),
  userID: z.string().min(2, "User ID is required"),
  userEmail: z.string().email("Invalid email address"),
  amountAttempted: z
    .number({ required_error: "Amount is required" })
    .positive("Amount must be greater than zero")
    
});

type DonationFormSchema = z.infer<typeof donationFormSchema>;

const DonationForm = ({
  projectID,
  userID,
  userEmail,
  maxAmount,
}: {
  projectID: string;
  userID: string;
  userEmail: string;
  maxAmount: number
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormSchema>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      projectID,
      userID,
      userEmail,
      amountAttempted: 0, 
      paymentType: 'donation'

    },
  });

  const processPaymentUrl = async (data: DonationFormSchema) => {
    const { success, message, payload } = await processPayment(data);
  
    if (success && payload?.approvalUrl?.startsWith("http")) {
      window.location.href = payload.approvalUrl;
    } else {
      toast.error(message ?? "Invalid approval URL returned from the server");
    }
  };

  const onSubmit = (data: DonationFormSchema) => {
    processPaymentUrl(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("projectID")} type="hidden" />
      <input {...register("userID")} type="hidden" />
      <input {...register("userEmail")} type="hidden" />

      <div>
        <Label htmlFor="amountAttempted">Donation Amount ($)</Label>
        <Input
          id="amountAttempted"
          type="number"
          step="0.01"
          min={10}
          max={maxAmount}
          {...register("amountAttempted", { valueAsNumber: true })}
          placeholder="Enter amount"
        />
        {errors.amountAttempted && (
          <p className="text-red-500 text-sm">{errors.amountAttempted.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light disabled:opacity-40"
      >
        {isSubmitting ? "Processing" : "Donate"}
      </button>
    </form>
  );
};

export default DonationForm;
