import SubscriptionAction from "@/components/actions/SubscriptionAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Content } from '@/app/lib/types'

export default function PricingCard({ plan }: { plan: Content }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="capitalize">{plan.label}</CardTitle>
        {/* <CardDescription>{plan.title}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-4xl font-bold">${plan.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{plan.subtitle ??  "per month"}</p>
        <ul className="mt-4 space-y-2">
          {plan.list && plan.list.map((feature) => (
            <li key={feature as string} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              {feature as string}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {
          plan.label && 
          <SubscriptionAction
            amountAttempted={Number(plan.title)}
            label={plan?.action?.label}
            planName={plan.label}
          />
        }
      </CardFooter>
    </Card>
  );
}