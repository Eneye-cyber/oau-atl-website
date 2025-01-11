// import TopBar from "@/app/ui/shared/TopBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteSchema } from '@/app/lib/types'
import HeaderSettings from "./ui/HeaderSettings";
import FooterSettings from "./ui/FooterSettings";
import SocialLinksSettings from "./ui/SocialLinksSettings";
import ApproveSettings from "./ui/ApproveSettings";


const baseUrl = process.env?.APP_URL ?? "http://localhost:3000"

const getData = async () => {
  const response = await fetch(`${baseUrl}/api/content?schema=layout`,  {
    cache: "no-cache"
  });
  const data = await response.json();
  return data;
};


const page = async () => {
    const data: SiteSchema = await getData()
  
  return (
    <>
      <article className="p-6 container flex flex-col gap-4 md:gap-6">
        <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 mt-12">
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-3">
              <AccordionTrigger><h3 className="text-lg font-semibold">Social medial Settings</h3></AccordionTrigger>
              <AccordionContent>

                <SocialLinksSettings jsonData={{...data?.general?.social}} />

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>


        <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 mt-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger><h3 className="text-lg font-semibold">Header Settings</h3></AccordionTrigger>
              <AccordionContent>

                <HeaderSettings jsonData={data?.general?.header} />

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 mt-12">
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-2">
              <AccordionTrigger><h3 className="text-lg font-semibold">Footer Settings</h3></AccordionTrigger>
              <AccordionContent>

                <FooterSettings jsonData={{...data?.general?.footer}} />

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

       <ApproveSettings data={data} />
      </article>
    </>
  );
};

export default page;
