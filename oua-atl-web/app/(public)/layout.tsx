"use client"
import TopBar from "@/app/ui/shared/TopBar";
import NavBar from "@/app/ui/shared/NavBar";
import Footer from "@/app/ui/shared/Footer";
import { SiteSchema } from "@/app/lib/types";
import SettingsProvider from "@/lib/contexts/SettingsProvider";
import { FooterSkeleton, NavBarSkeleton, TopBarSkeleton } from "@/app/ui/loaders/LayoutElementLoaders";
import { useAuth } from "@/lib/contexts/AuthProvider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  type Role = "member" | "admin" | "guest";
  const { user } = useAuth();
  const role = (user?.role as Role) ?? "guest";

  return (
    <SettingsProvider>
      {(data: SiteSchema, loading: boolean) => (
        <div className="flex-column h-full min-h-screen">
          <header aria-label="page-header" className="mb-uto">
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
