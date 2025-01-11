import DataTable from '@/app/ui/DataTable'
import { cookies } from 'next/headers'; 
const baseUrl = process.env.API_BASE;



async function getData(): Promise<any> {
  

  // Wait for both promises to resolve
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/users`;
    const res: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore as unknown as string
      },
      credentials: 'include', // Include cookies
      cache: 'no-store', // Force no caching for fresh data
    });
    
    if(res.ok) {
      const result = await res.json()
      console.log('mem result', result)
      return result
    }
    const msg = res.statusText
    throw new Error(msg ?? "Unknown error")
} catch (error: any) {
    console.log('error', error)
    return {message: error.message, payload: {data : []}}
}

  
}
const LatestMembers = async () => {
  const data = await getData()
  console.log(data.payload.data, 'data')
  const columns = [
    { key: 'full_name', label: 'Full name' },
    { key: 'email', label: 'Email' },
    { key: 'study_field', label: 'Course of study' },
    { key: 'year_graduated', label: 'Graduating year' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <>
        <DataTable title="Latest Members" columns={columns} data={data.payload?.data ?? []}  showActions={false} />
    </>
  )
}

export default LatestMembers