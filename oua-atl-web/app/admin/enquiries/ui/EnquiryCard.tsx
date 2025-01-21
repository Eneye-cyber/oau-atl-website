'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface EnquiryCardProps {
  email: string
  closed: boolean
  message: string
  subject: string
  full_name: string
  contact_id: string
  created_at: string
}

export default function EnquiryCard({
  email,
  closed,
  message,
  subject,
  full_name,
  contact_id,
  created_at,
}: EnquiryCardProps) {
  const createdDate = new Date(created_at)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isClosed, setClosed] = useState<boolean>(closed)

  const closeticket = async () => {
    try {
      setLoading(true)
      const req = await fetch(`/api/admin/enquiry/${contact_id}`, {method: 'PUT'})
      if(req.ok) {
        const res = await req.json()
        toast.success(res?.message ?? 'This issue has been marked as resolved')
        setClosed(true)
        return
      }
      throw new Error(req.statusText)
    } catch (error) {
      toast.error('Something went wrong', {description: (error as Error)?.message})
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`w-full max-w-2xl ${isClosed && "opacity-50"}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{subject}</CardTitle>
        <Badge variant={closed ? "secondary" : "default"}>{closed ? "Closed" : "Open"}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <span className="font-semibold mr-2">From:</span>
            <span>
              {full_name} ({email})
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Created:</span>
            <span>{formatDistanceToNow(createdDate, { addSuffix: true })}</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Message:</span>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{message}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={closeticket} disabled={isLoading || isClosed} >
          {isLoading && <Loader2 className="animate-spin" />}
          {closed ? "Enquiry Closed" : "Close Enquiry"}
        </Button>
      </CardFooter>
    </Card>
  )
}

