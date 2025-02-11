import TopBar from "@/app/ui/shared/TopBar";
import NavBar from "@/app/ui/shared/NavBar";
import Footer from "@/app/ui/shared/Footer";
import { getAuthSession, decrypt } from "@/lib/session";
import { SiteSchema } from "@/app/lib/types";

const baseUrl = process.env?.APP_URL ?? "http://localhost:3000";

const getData = async () => {
  const response = await fetch(`${baseUrl}/api/settings`);
  const payload = await response.json().catch(() => ({message: response.statusText}));
  return payload.data;
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: SiteSchema = await getData();
  type Role = "member" | "admin" | "guest";
  const authSession = getAuthSession();
  const user = await decrypt(authSession);

  const role = (user?.userRole as Role) ?? "guest";

  return (
    <>
      <div className="flex-column h-full min-h-screen">
        <header aria-label="page-header" className="mb-uto">
          <TopBar data={data?.general?.social} userRole={role} />
          <NavBar data={data?.general?.header} />
        </header>

        <main className="min-h-96 flex-1">{children}</main>

        <Footer data={data?.general?.footer} />
      </div>
    </>
  );
}
