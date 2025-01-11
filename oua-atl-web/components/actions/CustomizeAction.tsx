'use client'
import { useState } from 'react'

import JsonFormEditor from "@/app/ui/forms/JsonFormEditor"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LucideDoorOpen} from "lucide-react"
import { useDataContext } from '@/lib/contexts/DataContext'
import { toast } from 'sonner'
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
} from "@/components/ui/alert-dialog"

export function CustomizeAction({
  page,
}: Readonly<{
  page: string;
}>) {

  const [open, setOpen] = useState(true);
  const { state } = useDataContext()
  const saveChanges = async () => {
    try {
      const req: Response = await fetch('/api/schema', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({schema: state}),
        credentials: 'include',
      })
      if(req.ok) {
        const res = await req.json();
        toast.success(res.message)
        return
      }

      throw new Error(req.statusText)

      
    } catch (error: unknown) {
      if(error instanceof Error) 
      toast.error('Something went wrong', { description: error.message})
    }
  }
  const approveChanges = async () => {
    try {
      const req: Response = await fetch('/api/schema', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({schema: state}),
        credentials: 'include',
      })
      if(req.ok) {
        const res = await req.json();
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} className="fixed right-8 bottom-8"> <LucideDoorOpen /></Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[320px] sm:w-[540px] sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit Page</SheetTitle>
          <SheetDescription>
            Make changes this here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

          <div className="overflow-y-auto h-1 grow pr-2.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <JsonFormEditor page={page} />
          </div>

        <SheetFooter className='flex-between w-full'>
          {/* <SheetClose asChild>
            <Button onClick={saveChanges}>Save changes</Button>
          </SheetClose> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary" className='mr-auto'>Approve changes</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please endeavour to save your changes before proceeding. 
                  Only saved changes will be approved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={approveChanges} >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* <Button onClick={approveChanges}>Approve changes</Button> */}
          <Button onClick={saveChanges}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

