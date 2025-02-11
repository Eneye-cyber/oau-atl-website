import ResetPasswordForm from "@/app/ui/forms/ResetPasswordForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUserId } from "@/lib/utils/api";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATL OAU | Password reset',
}


const page = async () => {
  const {id} = await currentUserId()
    
  return (
    <div className="bg-gray-100 flex-1">
      <div className="p-4 sm:p-6 lg:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold"> Change Password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold opacity-60">Password reset form</h2>
            {id &&  <ResetPasswordForm userId={id} />}
          </section>

        </CardContent>
        
      </Card>
    </div>
    </div>
  )
}

export default page