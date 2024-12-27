import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { cookies } from 'next/headers'


const baseUrl = process.env.API_BASE;
type PaymentResponse = {
  message: string;
  payload: {
      reference: string;
  };
  error?: boolean
};

const capturePayment = async ( trxref: string, reference: string) => {
  const cookieStore = cookies();
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
  try {
    const url = `${baseUrl}/payments/capture?trxref${trxref}&reference${reference}`
    const res: Response = await fetch(url, 
      {
        method: 'POST',
        headers: {
          Cookie: incomingCookies
        },
        credentials: "include"
      }
    )
    if(res.ok) {
      const result: PaymentResponse = await res.json()
      return result
    }
    
    throw new Error(res.statusText)
  } catch (error: unknown) {
    if(error instanceof Error) {
      return { message: error.message, payload: { reference: reference }, error: true}
    }
    return { message: 'Something went wrong', payload: { reference: reference }, error: true}
  }
}


const page = async ({searchParams}: { searchParams: {trxref: string; reference: string} }) => {
  const { trxref, reference } = searchParams
  const paymentStatus = await capturePayment(trxref, reference)


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
                "Thank you for your contribution. Your donation has been processed successfully."
              }
            </p>
            {/* <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Order Number: <span className="font-semibold">{orderNumber}</span></p>
              <p className="text-sm text-gray-600">Amount Paid: <span className="font-semibold">{amount}</span></p>
            </div> */}
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