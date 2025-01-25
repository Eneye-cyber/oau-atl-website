'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SignInForm from "@/app/ui/forms/SignInForm";
import { Button } from "@/components/ui/button"
import { UserRoleResponse, PaymentResponse } from "@/app/lib/types";

interface User extends UserRoleResponse {
  email: string | null;
}

const SubscriptionAction = ({ amountAttempted, planName, label }: { label?: string; planName: string; amountAttempted: number; }) => {
  const [dialogState, setDialogState] = useState<"signIn" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const processPaymentUrl = async (data: User) => {
    setIsLoading(true);
    let body = { 
      amountAttempted, 
      planName,
      userID: data.id,
      userEmail: data.email,
      paymentType: 'subscription'

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

      const result: PaymentResponse = await response.json();

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

  const verifyUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/current");
      const data: User = await response.json();

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
