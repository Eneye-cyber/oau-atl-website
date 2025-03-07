import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE; // Ensure it's accessible in the client

const paymentUrl: Record<string, string> = {
  booking: `${baseUrl}/bookings/pay`,
  donation: `${baseUrl}/donations/pay`,
  subscription: `${baseUrl}/subscriptions/pay`,
};

const TIMEOUT_MS = 10000;

export const processPayment = async (data: any): Promise<{ success: boolean; message?: string; payload?: {approvalUrl: string} | null}> => {
  const paymentType: keyof typeof paymentUrl = data.paymentType;
  const url = paymentUrl[paymentType];
  if (!url) {
    toast.error("Invalid payment type");
    return { success: false, message: "Invalid payment type" };
  }

  delete data["paymentType"];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const result = await response.json().catch(() => ({ message: response.statusText }));

    if (response.ok) {
      return { success: true, message: result.message, payload: result.payload };
    }

    console.error("Payment error:", result);
    toast.error(result.message || "Payment failed");
    return { success: false, message: result.message || "Payment failed", payload: null };
  } catch (error) {
    clearTimeout(timeout);
    const errorMessage = (error as Error)?.message || "An error occurred";
    console.error("Payment error:", errorMessage);
    toast.error("Payment gateway error", { description: errorMessage });
    return { success: false, message: errorMessage, payload: null };
  }
};
