import { UserProfile } from "@/app/lib/types";
import EditProfileForm from "@/app/ui/forms/members/EditProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUserId, fetchData } from "@/lib/utils/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATL OAU | Edit Profile',
  description: "Manage user profile and details"
}


async function getData(): Promise<{ message: string; payload: UserProfile }> {

    const {id} = await currentUserId()
  
  const url = `/users/${id}/profile`;
  // console.log('Requesting profile from ', url)
  const result = await fetchData(url)
  return result

}

const page = async () => {
  const data = await getData();
  const user = data.payload

  return (
    <div className="bg-gray-100 flex-1">
      <div className="p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl md:text-3xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold opacity-60">User profile form</h2>
            <EditProfileForm user={user} />
          </section>

        </CardContent>
        
      </Card>
    </div>
    </div>
  )
}

export default page