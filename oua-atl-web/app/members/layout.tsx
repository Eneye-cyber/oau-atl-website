'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/app/ui/shared/TopBar'
import NavBar from '@/app/ui/shared/NavBar'
import Footer from '@/app/ui/shared/Footer'
import LoadingSpinner from '@/components/LoadingSpinner';


export default function MembersLayout({ children }: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchRole() {
      try {
        const response = await fetch('/api/user', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setRole(data.role);
        setId(data.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.replace('/admin/login');
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    }
    fetchRole();
  }, [router]);


  // Redirect if the user is not an admin or is unauthenticated
  if (!id || role !== 'member') {
    router.replace(role !== 'member' ? '/' : '/members/login');
    return null; // Prevent rendering until navigation completes
  }


  return (
    <>
    <div className='flex-column h-full min-h-screen'>
      <header aria-label="page-header" className='mb-uto'>
        <TopBar />
        <NavBar />
      </header>
    {
      isLoading 
        ? <LoadingSpinner /> 
        : (
          <main className='min-h-96 flex-1 flex flex-col'>
            {children}
          </main>
        )
      
    }
      
      <Footer />
    </div>


    </>
  )
}