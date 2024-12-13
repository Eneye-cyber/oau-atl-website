import UserProfile from '@/app/ui/cards/UserProfile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const baseUrl = process.env?.API_BASE ?? ''

async function getData(id: string): Promise<{ message: string; payload: any | null }> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  try {
    const url = `${baseUrl}/users/${id}/profile`;
    console.log('Requesting profile from ', url)
    const cookiesList = cookies();
    const res = await fetch(url, { 
      headers : { Cookie: cookiesList as unknown as string }, method: 'GET', credentials: 'include' 
    });

    if (!res.ok) {
      return { message: `Error ${res.status}: ${res.statusText}`, payload: null };
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { message: error.message || 'An unexpected error occurred.', payload: null };
  }
}

const page = async () => {
  const cookiesList = cookies();
  const userId = cookiesList.get('x-custom-id')?.value ?? null;

  if(!userId) redirect("/")

    const data = await getData(userId);
  return (
    <div>
      <UserProfile user={data.payload} />
    </div>
  )
}

export default page