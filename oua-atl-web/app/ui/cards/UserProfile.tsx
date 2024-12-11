import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, PhoneIcon, MailIcon, Edit2Icon, KeyIcon } from 'lucide-react'
import Link from "next/link"

interface UserProfile {
  user_id?: string
  first_name: string
  last_name: string
  email: string
  username: string
  address: string
  address2: string | null
  city: string
  zip_code: number
  phone: string
  birth_date: string
  hobbies: string[]
  is_volunteering: boolean
  verified: boolean
  membership_expired: boolean
  email_verified: boolean
}

export default function UserProfile({user}: {user: UserProfile}) {


  return (
    <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold">User Profile</CardTitle>
          <Button variant="outline" size="sm">
            <Edit2Icon className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{`${user.first_name} ${user.last_name}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {`${new Date(user.birth_date).getDate()}/${new Date(user.birth_date).getMonth()}`}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium flex items-center">
                  <MailIcon className="mr-2 h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium flex items-center">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  {user.phone}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium flex items-start">
                  <MapPinIcon className="mr-2 h-4 w-4 mt-1" />
                  <span>{`${user.address}, ${user.city}, ${user.zip_code}`}</span>
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Interests & Status</h2>
            <div>
              <p className="text-sm text-gray-500 mb-2">Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {user.hobbies.map((hobby, index) => (
                  <Badge key={index} variant="secondary">{hobby}</Badge>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Volunteering</p>
                <p className="font-medium">{user.is_volunteering ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={user.verified ? "success" : "destructive"}>
                    {user.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge variant={user.membership_expired ? "destructive" : "success"}>
                    {user.membership_expired ? "Expired" : "Active"}
                  </Badge>
                  <Badge variant={user.email_verified ? "success" : "destructive"}>
                    {user.email_verified ? "Email Verified" : "Email Unverified"}
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/members/reset-password">
            <Button variant="outline">
              <KeyIcon className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </Link>
          <Button variant="default">
            <Edit2Icon className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

