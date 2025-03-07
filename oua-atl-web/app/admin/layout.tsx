'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DrawerNavigation from './ui/DrawerNavigation';
import TopBar from './ui/TopBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from "@/lib/contexts/AuthProvider";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  type Role = "member" | "admin" | "guest";
  const { user, loading: authLoading } = useAuth();
  const role = (user?.role as Role) ?? "guest";
  const router = useRouter();

  useEffect(() => {
      if ((!role || role !== "admin") && !authLoading) {
        router.replace('/admin/login');
      }
    }, [role, authLoading, router]);
  
    if (authLoading) {
      return <LoadingSpinner />;
    }

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
