import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'
import { headers } from 'next/headers';


export default function PublicLayout({ children }: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const role = headersList.get('x-custom-role') ?? null;
  // const userId = headersList.get('x-custom-id') ?? null;
  return (
    <>
    <div className='flex-column h-full min-h-screen'>
      <header aria-label="page-header" className='mb-uto'>
        <TopBar role={role} />
        <NavBar />
      </header>

      <main className='min-h-96 flex-1 flex flex-col'>
        {children}
      </main>
      
      <Footer />
    </div>


    </>
  )
}