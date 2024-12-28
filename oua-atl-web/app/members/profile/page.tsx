import UserProfile from '@/app/ui/cards/UserProfile';
import { cookies } from 'next/headers';
const baseUrl = process.env?.API_BASE ?? ''

async function getData(): Promise<{ message: string; payload: any | null }> {
  if (!baseUrl) throw new Error("API_BASE environment variable is not set.");
  const cookieStore = cookies();

  const id = cookieStore.get('x-custom-id')?.value ?? null
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
  try {
    const url = `${baseUrl}/users/${id}/profile`;
    console.log('Requesting profile from ', url)

    const res = await fetch(url, { 
      headers : { Cookie: incomingCookies }, method: 'GET', credentials: 'include' 
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
  const data = await getData();
  return (
    <div>
      <UserProfile user={data.payload} />
    </div>
  )
}

export default page