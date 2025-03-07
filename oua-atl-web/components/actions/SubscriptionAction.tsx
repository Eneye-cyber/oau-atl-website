'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SignInForm from "@/app/ui/forms/SignInForm";
import { Button } from "@/components/ui/button"
import { UserRoleResponse, PaymentResponse } from "@/app/lib/types";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { processPayment } from "@/lib/utils/api/payment";

interface User extends UserRoleResponse {
  email: string | null;
}

const SubscriptionAction = ({ amountAttempted, planName, label }: { label?: string; planName: string; amountAttempted: number; }) => {
  const [dialogState, setDialogState] = useState<"signIn" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth()

  const processPaymentUrl = async (data: User) => {
    setIsLoading(true);
  
    const body = { 
      amountAttempted, 
      planName,
      userID: data.id,
      userEmail: data.email,
      paymentType: "subscription",
    };
  
    const { success, message, payload } = await processPayment(body);
  
    if (success && payload?.approvalUrl?.startsWith("http")) {
      window.location.href = payload.approvalUrl;
    } else {
      toast.error(message ?? "Invalid approval URL returned from the server");
    }
  };

  const verifyUser = async () => {
    setIsLoading(true);
    try {
      const data: User = user;

      if (!data.role || !data.id || !data.email) {
        setDialogState("signIn");
        return;
      }
      if (data.role !== "member") {
        const errMessage =
          data.role === "admin"
            ? "Please log out of admin account to proceed"
            : "This feature is reserved for alumni members only";
        throw new Error(errMessage);
      }

      registerUser(data)

    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error?.message || "Unauthorized access",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = (arg: User | null) => {
    if(!arg) {
      return
    }
    processPaymentUrl(arg)
  }

  return (
    <>
      <Button 
        className={`w-full capitalize ${isLoading && "opacity-40 pointer-events-none"}`}
        disabled={isLoading}
        onClick={verifyUser}
      >
        {isLoading ? "Processing..." : `${label ?? "Subscribe"}`}
      </Button>

      <Dialog open={dialogState === "signIn"} onOpenChange={() => setDialogState(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="opacity-0 absolute">Login</DialogTitle>
            <DialogDescription>Enter your login details to proceed</DialogDescription>
          </DialogHeader>
          <SignInForm noRedirect={true} onLoginSuccess={registerUser} />
        </DialogContent>
      </Dialog>
      
    </>
  );
};

export default SubscriptionAction;
