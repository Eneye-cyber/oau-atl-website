"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthProvider";
import SettingsProvider from "@/lib/contexts/SettingsProvider";
import TopBar from "@/app/ui/shared/TopBar";
import NavBar from "@/app/ui/shared/NavBar";
import Footer from "@/app/ui/shared/Footer";
import { FooterSkeleton, NavBarSkeleton, TopBarSkeleton } from "@/app/ui/loaders/LayoutElementLoaders";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  type Role = "member" | "admin" | "guest";
  const { user, loading: authLoading } = useAuth();
  const role = (user?.role as Role) ?? "guest";
  const router = useRouter();

  useEffect(() => {
    if ((!role || role === "guest") && !authLoading) {
      router.replace('/members/login');
    }
  }, [role, authLoading, router]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SettingsProvider>
      {({ data, loading }: { data: any; loading: boolean }) => (
        <div className="flex-column h-full min-h-screen">
          <header aria-label="page-header" className="mb-auto">
            {loading ? (
              <>
                <TopBarSkeleton />
                <NavBarSkeleton />
              </>
            ) : (
              <>
                <TopBar data={data?.general?.social ?? {}} userRole={role} />
                <NavBar data={data?.general?.header ?? {}} />
              </>
            )}
          </header>

          <main className="min-h-96 flex-1">{children}</main>

          <footer>
            {loading ? <FooterSkeleton /> : <Footer data={data?.general?.footer ?? {}} />}
          </footer>
        </div>
      )}
    </SettingsProvider>
  );
}
