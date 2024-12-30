import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { capturePayment } from '@/lib/utils/api'
import { PostPaymentResponse } from '@/app/lib/types'

const genMessage = (arg: string) => {
  if(arg === 'booking') return 'Your ticket purchase has been processed successfully.'
  if(arg === 'donation') return "Thank you for your contribution. Your donation has been processed successfully."
  if(arg === 'subcription') return "Your membership subscription has been processed successfully."
  return "Your payment has been processed successfully"

}

const page = async ( {params, searchParams} : {
     params: {slug: string}, 
     searchParams: {trxref: string; reference: string} }
    ) => {
  const { slug } = params
  const { trxref, reference } = searchParams
  const paymentStatus: PostPaymentResponse = await capturePayment(trxref, reference)
  const message = genMessage(slug)

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
                  ? "Invalid or previously captured payment reference" : message
              }
            </p>

          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default page