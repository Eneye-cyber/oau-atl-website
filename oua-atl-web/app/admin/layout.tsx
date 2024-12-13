
import { redirect } from "next/navigation";
import DrawerNavigation from "./ui/DrawerNavigation"
import TopBar from "./ui/TopBar";
import { cookies } from 'next/headers';
const baseUrl = process.env?.API_BASE ?? "https://oau-atl-server.onrender.com/api/v1";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookiesList =  cookies();
    const id = cookiesList.get('x-custom-id')?.value ?? '';
    // console.log('cookies', cookiesList.entries(), cookiesList.values())
    // if(!id) {
    //   redirect("/admin/login")
    // }
    console.log(id, 'id')

  return (
    <>
    {/* <PreLoader /> */}
    <div id="content" className={`flex-auto flex flex-col w-full h-full min-h-dvh relative bg-[#F6FAFB] overflow-hidden`} >
      <section className="flex flex-col z-0 xl:ml-72 flex-1">
        <TopBar />
        <main className="w-full flex-1 flex flex-col">
          {children}

        </main>
      </section>

      <DrawerNavigation userId={id} baseUrl={baseUrl} />


    </div>
    </>
  );
}
