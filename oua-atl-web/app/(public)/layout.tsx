import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'
import { headers, cookies } from 'next/headers';

export default function PublicLayout({ children }: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const role = headersList.get('x-custom-role') ?? null;

  const cookieStore = cookies();
  const flashMessage = cookieStore.get('flash-message')?.value;
  // const userId = headersList.get('x-custom-id') ?? null;

   // Clear the flash message cookie
   if (flashMessage) {
    cookies().set('flash-message', '', { maxAge: 0 });
  }
  return (
    <>
    <div className='flex-column h-full min-h-screen'>
      <header aria-label="page-header" className='mb-uto'>
        <TopBar role={role} />
        <NavBar />
      </header>

      <main className='min-h-96 flex-1'>
        {flashMessage && (
          <ol 
            className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
          >
            <li 
              role="status" 
              aria-live="off" 
              aria-atomic="true" 
              tabIndex={0} 
              data-state="open" 
              data-swipe-direction="right" 
              className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full border bg-background text-foreground" 
              data-radix-collection-item="" 
            >
              <div className="grid gap-1">
                <div className="text-sm opacity-90">{flashMessage}</div>
              </div>
              
            </li>
          </ol>
          )}

        {children}
      </main>
      
      <Footer />
    </div>


    </>
  )
}