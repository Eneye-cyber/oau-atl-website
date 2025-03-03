import TopBar from "@/app/ui/shared/TopBar";
import NavBar from "@/app/ui/shared/NavBar";
import Footer from "@/app/ui/shared/Footer";
import { SiteSchema } from "../lib/types";
import SettingsProvider from "@/lib/contexts/SettingsProvider";
import { Suspense } from "react";
import { getAuthSession, decrypt } from "@/lib/session";
import {
  FooterSkeleton,
  NavBarSkeleton,
  TopBarSkeleton,
} from "@/app/ui/loaders/LayoutElementLoaders";

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  type Role = "member" | "admin" | "guest";
  const authSession = getAuthSession();
  const user = await decrypt(authSession);

  const role = (user?.userRole as Role) ?? "guest";

  return (
    <>
      <div className="flex-column h-full min-h-screen">
        <header aria-label="page-header" className="mb-auto">
          <Suspense
            fallback={
              <>
                <TopBarSkeleton />
                <NavBarSkeleton />
              </>
            }
          >
            <SettingsProvider>
              {(data: SiteSchema) => (
                <>
                  <TopBar data={data?.general?.social ?? {}} userRole={role} />
                  <NavBar data={data?.general?.header ?? {}} />
                </>
              )}
            </SettingsProvider>
          </Suspense>
        </header>

        <main className="min-h-96 flex-1">{children}</main>

        <Suspense fallback={<FooterSkeleton />}>
          <SettingsProvider>
            {(data) => <Footer data={data?.general?.footer ?? {}} />}
          </SettingsProvider>
        </Suspense>
      </div>
    </>
  );
}
