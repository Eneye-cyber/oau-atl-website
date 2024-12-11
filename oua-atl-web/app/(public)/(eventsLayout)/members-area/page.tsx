import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Members Area | ATL Alumni"
}

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
}


function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-4xl font-bold">{plan.price}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
        <ul className="mt-4 space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe to {plan.name}</Button>
      </CardFooter>
    </Card>
  )
}


const page = () => {
  const pricingPlans = [
    {
      name: "Montly Plan",
      price: "$20",
      description: "",
      features: ["Budget Plan", "Easy to Manage", "Monthly instalments", "Available All Year Round"],
    },
    {
      name: "Earlybird Plan",
      price: "$150",
      description: "",
      features: ["Save $90/ year", "Earlybird Discount", "Single Annual Payment", "Valid Until March 31st"],
    },
    {
      name: "Annual Plan",
      price: "$180.00",
      description: "",
      features: [
        "Peace of Mind Plan",
        "Single Annual Payment",
        "Cheaper than Monthly Payment",
        "Available All Year Round",
      ],
    },
  ]
  return (
    <div className="flex-1">
       <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 space-y-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center ">Members Area</h2>
            <p className="text-gray-500 dark:text-gray-400">
              MEMBERSHIP  OF THIS WEBSITE IS OPEN TO ALL THOSE WHO HAVE ATTENDED THE UNIVERSITY OF IFE/ OBAFEMI AWOLOWO UNIVERSITY, ILE IFE, NIGERIA.  JOINING THE WEBSITE IS FREE, HOWEVER, ALL MEMBERS ARE EXPECTED TO PAY MEMBERSHIP DUES. 
            </p>

            <p className="text-gray-500 dark:text-gray-400">IF YOU WOULD LIKE TO CONTINUE AS A REGISTERED USER OF THIS WEBSITE, YOU MAY DO SO USING THE FACILITIES BELOW.</p>

          </div>
        </section>
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Choose Your Membership Plan
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Select the perfect plan for your needs.
              </p>
            </div>
          </div>
          <div id="subscribe" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page