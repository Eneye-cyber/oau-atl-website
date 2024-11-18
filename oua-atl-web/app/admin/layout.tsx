
import DrawerNavigation from "./ui/DrawerNavigation"
import TopBar from "./ui/TopBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {/* <PreLoader /> */}
    <div id="content" className={`flex-auto flex flex-col w-full h-full min-h-dvh relative bg-[#F6FAFB]`} >
      <DrawerNavigation />
      <section className="flex flex-col z-0 ml-72 flex-1">
        <TopBar />
        <main className="w-full flex-1">
          {children}

        </main>
      </section>

    </div>
    </>
  );
}
