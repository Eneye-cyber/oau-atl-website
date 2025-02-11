"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const AllowSubscription = ({
  id,
  apiUrl,
}: {
  id: string;
  apiUrl: string;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const approveMember = async () => {
    const url = `${apiUrl}/subscriptions/approve-user`;
    const body = JSON.stringify({ userId: id });

    try {
      setLoading(true);
      const req: Response = await fetch(url, {
        method: "POST",
        body,
        credentials: "include",
      });

      if (req.ok) {
        const res = await req.json().catch(() => ({message: req.statusText}));
        toast.success("Operation Successful", {
          description: res.data?.message ?? "Approval Successfull",
        });
        setDisabled(true);
        return reloadPage();
      }

      throw new Error(req.statusText);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong", { description: error.message });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading || isDisabled}
      variant={"default"}
      className="disabled:opacity-50"
      onClick={approveMember}
    >
      Click to grant member access to subscriptions
    </Button>
  );
};

export default AllowSubscription;
