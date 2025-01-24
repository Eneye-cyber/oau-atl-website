import UserProfile from '@/app/ui/cards/UserProfile';
import { fetchData } from '@/lib/utils/api';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'ATL OAU | User Profile',
  description: "Manage user profile and data"
}

async function getData(): Promise<{ message: string; payload: any | null }> {
  const cookieStore = cookies();
  const id = cookieStore.get('x-custom-id')?.value ?? null
  const url = `/users/${id}/profile`;
  // console.log('Requesting profile from ', url)
  const result = await fetchData(url)
  return result

}

const page = async () => {
  const data = await getData();
  return (
    <div>
      {!data.payload ? 
        (
          <div className="flex flex-col items-center justify-center text-center py-12">
          
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please log out and try again later.
          </p>
        </div>
        )
        : <UserProfile user={data.payload} />
      }
      
    </div>
  )
}

export default page