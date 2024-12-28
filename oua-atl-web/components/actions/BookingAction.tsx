'use client';

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import SignInForm from "@/app/ui/forms/SignInForm";
import { UserRoleResponse } from "@/app/lib/types";
import BookingForm from "@/app/ui/forms/payment/BookingForm";

interface User extends UserRoleResponse {
  email: string | null;
}

const BookingAction = ({ eventID, ticketPrice }: { eventID: string; ticketPrice: number; }) => {
  const [dialogState, setDialogState] = useState<"signIn" | "donation" | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setUser(data);
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
    setUser(arg)
    setDialogState("donation")
  }

  return (
    <>
      <button
        disabled={isLoading}
        onClick={verifyUser}
        className={`w-full sm:w-fit ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-jet-black
           ${isLoading && "opacity-40 pointer-events-none"}`}
      >
        {isLoading ? "Processing..." : "Order now"}
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
          {(user?.email && user?.id) && (
            <BookingForm ticketID={eventID} userID={user.id} userEmail={user.email} amountAttempted={ticketPrice} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingAction;
