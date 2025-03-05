"use client"; // Ensures this component runs on the client side

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { capturePayment } from "@/lib/utils/client/api";
import { PostPaymentResponse } from "@/app/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

const genMessage = (arg: string) => {
  if (arg === "booking") return "Your ticket purchase has been processed successfully.";
  if (arg === "donation") return "Thank you for your contribution. Your donation has been processed successfully.";
  if (arg === "subscription") return "Your membership subscription has been processed successfully.";
  return "Your payment has been processed successfully.";
};

const PaymentStatusPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const [paymentStatus, setPaymentStatus] = useState<PostPaymentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params?.slug as string;
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!trxref || !reference) {
        setError("Invalid payment reference.");
        setLoading(false);
        return;
      }

      try {
        const response = await capturePayment(trxref, reference);
        setPaymentStatus(response);
      } catch (err) {
        setError("Failed to process payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [trxref, reference]);

  if (loading) <LoadingSpinner text="Processing payment..." />

  const message = genMessage(slug);
  const isError = paymentStatus?.error || error;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className={`h-10 w-10 ${isError ? "text-red-600" : "text-green-600"}`} />
          </div>
          <CardTitle className={`text-2xl font-bold ${isError ? "text-red-600" : "text-green-600"}`}>
            {isError ? "Payment Failed" : paymentStatus?.message || "Payment Successful"}!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            {isError ? "Invalid or previously captured payment reference." : message}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentStatusPage;
