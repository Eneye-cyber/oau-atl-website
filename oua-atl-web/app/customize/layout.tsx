"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthProvider";
import TopBar from "@/app/ui/shared/TopBar";
import NavBar from "@/app/ui/shared/NavBar";
import Footer from "@/app/ui/shared/Footer";
import { headers } from "next/headers";
import { DataProvider } from "@/lib/contexts/DataContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PublicLayout({
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
      router.replace("/admin/login");
      return;
    }
  }, [role, authLoading, router]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <DataProvider>
        <div className="flex-column h-full min-h-screen">
          <header aria-label="page-header" className="mb-uto">
            <TopBar userRole={role} />
            <NavBar />
          </header>
          <main className="min-h-96 flex-1">{children}</main>

          <Footer />
        </div>
      </DataProvider>
    </>
  );
}
