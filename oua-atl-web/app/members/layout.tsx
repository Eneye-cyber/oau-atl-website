import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'
import { headers } from 'next/headers'
import { SiteSchema } from '../lib/types'

const baseUrl = process.env?.APP_URL ?? "http://localhost:3000"

const getData = async () => {
  const response = await fetch(`${baseUrl}/api/content?schema=layout`);
  const data = await response.json();
  return data;
};


export default async function MembersLayout({ children }: {
  children: React.ReactNode
}) {
  const data: SiteSchema = await getData()
  type Role = "member" | "admin" | "guest"
  const header = headers()
  const role: Role  = header.get('x-custom-role') as Role ?? "guest"

  return (
    <>
    <div className='flex-column h-full min-h-screen'>
      <header aria-label="page-header" className='mb-uto'>
        <TopBar data={data?.general?.social} userRole={role} />
        <NavBar data={data?.general?.header} />
      </header>

      <main className='min-h-96 flex-1'>

        {children}
      </main>
      
      <Footer data={data?.general?.footer} />
    </div>


    </>
  )
}