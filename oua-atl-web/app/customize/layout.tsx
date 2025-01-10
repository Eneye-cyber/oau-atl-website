import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'
import { headers } from 'next/headers'
import { DataProvider } from '@/lib/contexts/DataContext'
export default function PublicLayout({ children }: {
  children: React.ReactNode
}) {
  type Role = "member" | "admin" | "guest"
  const header = headers()
  const role: Role  = header.get('x-custom-role') as Role ?? "guest"

  return (
    <>
    <DataProvider>
      <div className='flex-column h-full min-h-screen'>
        <header aria-label="page-header" className='mb-uto'>
          <TopBar userRole={role} />
          <NavBar />
        </header>
        <main className='min-h-96 flex-1'>

          {children}
        </main>
        
        <Footer />
      </div>
    </DataProvider>


    </>
  )
}