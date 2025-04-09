'use client';

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SignInForm from "@/app/ui/forms/SignInForm";
import { UserRoleResponse } from "@/app/lib/types";
import BookingForm from "@/app/ui/forms/payment/BookingForm";
import { useAuth } from "@/lib/contexts/AuthProvider";

interface User extends UserRoleResponse {
  email: string | null;
}

const BookingAction = ({ ticketID, ticketPrice }: { ticketID?: number; ticketPrice?: number; }) => {
  const [dialogState, setDialogState] = useState<"signIn" | "donation" | null>(null);
  // const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const verifyUser = () => {
    setIsLoading(true);
    try {
      const data: User = user;

      if (!data?.role || !data?.id || !data?.email) {
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
      setDialogState("donation");
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
    setDialogState("donation")
  }

  const hasTicketInfo = !!ticketID && !!ticketPrice

  return (
    <>
      <button
        disabled={isLoading || !hasTicketInfo}
        onClick={verifyUser}
        className={`w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black
           ${(isLoading || !hasTicketInfo) && "opacity-40 pointer-events-none"}`}
      >
        {isLoading ? "Processing..." : "Purchase Ticket"}
      </button>

      <Dialog open={dialogState === "signIn"} onOpenChange={() => setDialogState(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="opacity-0 absolute">Login</DialogTitle>
            <DialogDescription>Enter your login details to proceed</DialogDescription>
          </DialogHeader>
          <SignInForm noRedirect={true} onLoginSuccess={registerUser} />
        </DialogContent>
      </Dialog>

      <Dialog open={dialogState === "donation"} onOpenChange={() => setDialogState(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Form</DialogTitle>
            {/* <DialogDescription>Number </DialogDescription> */}
          </DialogHeader>
          {(user?.email && user?.id && hasTicketInfo) && (
            <BookingForm ticketID={ticketID} userID={user.id} userEmail={user.email} amountAttempted={ticketPrice} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingAction;
