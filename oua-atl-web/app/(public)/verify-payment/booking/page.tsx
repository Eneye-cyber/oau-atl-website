import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { capturePayment } from '@/lib/utils/api'
import { PostPaymentResponse } from '@/app/lib/types'



const page = async ({searchParams}: { searchParams: {trxref: string; reference: string} }) => {
  const { trxref, reference } = searchParams
  const paymentStatus: PostPaymentResponse = await capturePayment(trxref, reference)


  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className={`h-10 w-10 ${paymentStatus?.error ? "text-red-600" : "text-green-600"}`} />
            </div>
            <CardTitle className={`text-2xl font-bold ${paymentStatus?.error ? "text-red-600" : "text-green-600"}`}>{paymentStatus?.message}!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              {
                paymentStatus?.error 
                  ? "Invalid or previously captured payment reference" : 
                "Your ticket purchase has been processed successfully."
              }
            </p>

          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/projects">
              <Button>Return to Projects</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default page