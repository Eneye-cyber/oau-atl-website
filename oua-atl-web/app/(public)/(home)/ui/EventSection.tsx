import { BellRing } from "lucide-react"
import Image from "next/image"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Timeline from "./TimelineEvent"

const EventSection = () => {
  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-5">
        <h3 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Events</h3>
      </div>
      <div className="md:col-span-2">
        <Card className="bg-transparent rounded-none">
          {/* <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader> */}
          <CardContent className="grid gap-4">
            <figure className=" flex items-center space-x-4 border shadow-box shadow-gray-500">
              <Image
                src="/img/reunion.jpg"
                alt="#_"
                width={464}
                height={300}
                className="bg-gray-200  overflow-hidden w-full object-cover object-center"
              />
            </figure>
            <div className="flex items-center ">
              <div className="flex-1 space-y-1">
                <h5 className="text-3xl font-bold text-primary leading-none">
                  Alumni End-of-Year Reunion (2024)
                </h5>
                <p className="text-sm text-muted-foreground">
                  18th, December 2024
                </p>

                <div className="py-3">
                    Join us for a festive gathering to reconnect with old friends, celebrate accomplishments, and create lasting memories.
                </div>
              </div>
            </div>
          </CardContent>
         
        </Card>
      </div>
      <div className="md:col-span-3 flex items-center justify-end">
        <Timeline />
      </div>

    </div>
  )
}

export default EventSection