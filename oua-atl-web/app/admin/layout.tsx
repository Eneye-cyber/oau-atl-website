// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import DrawerNavigation from './ui/DrawerNavigation';
import TopBar from './ui/TopBar';
import LoadingSpinner from '@/components/LoadingSpinner';


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const [role, setRole] = useState<string | null>(null);
  // const [id, setId] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(true); // New loading state

  // useEffect(() => {
  //   async function fetchRole() {
  //     try {
  //       const response = await fetch('/api/user', { credentials: 'include' });
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch user data');
  //       }
  //       const data = await response.json().catch(() => ({message: response.statusText}));
  //       setRole(data.role);
  //       setId(data.id);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       router.replace('/admin/login');
  //     } finally {
  //       setIsLoading(false); // Stop loading regardless of success or failure
  //     }
  //   }
  //   fetchRole();
  // }, [router]);

  // // Show a loading state while fetching user data
  // if (isLoading) {
  //   return <LoadingSpinner></LoadingSpinner>;
  // }

  // // Redirect if the user is not an admin or is unauthenticated
  // if (!id || role !== 'admin') {
  //   router.replace(role !== 'admin' ? '/' : '/admin/login');
  //   return null; // Prevent rendering until navigation completes
  // }

  return (
    <div
      id="content"
      className="flex-auto flex flex-col w-full h-full min-h-dvh relative bg-[#F6FAFB] overflow-hidden"
    >
      <section className="flex flex-col z-0 xl:ml-72 flex-1">
        <TopBar />
        <main className="w-full flex-1 flex flex-col">{children}</main>
      </section>
      <DrawerNavigation />
    </div>
  );
}
