'use client'
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import { SiteSchema } from "@/app/lib/types";


const ApproveSettings = ({data}: {data: SiteSchema}) => {
  const approveChanges = async () => {
    try {
      const req: Response = await fetch('/api/schema/site', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({schema: data}),
        credentials: 'include',
      })
      if(req.ok) {
        const res = await req.json().catch(() => ({message: req.statusText}));
        toast.success(res.message)
        return
      }

      throw new Error(req.statusText)

      
    } catch (error: unknown) {
      if(error instanceof Error) 
      toast.error('Something went wrong', { description: error.message})
    }
  }
  return (
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="ml-auto">
            Approve changes
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Please endeavour to save your changes before proceeding. Only
              saved changes will be approved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={approveChanges}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApproveSettings;
