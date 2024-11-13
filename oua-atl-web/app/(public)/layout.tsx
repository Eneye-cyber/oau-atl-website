import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'

export default function PublicLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
    <div className='flex-column h-full min-h-screen'>
      <header aria-label="page-header" className='mb-uto'>
        <TopBar />
        <NavBar />
      </header>

      <main className='min-h-96 flex-1'>
        {children}
      </main>
      
      <Footer />
    </div>


    </>
  )
}