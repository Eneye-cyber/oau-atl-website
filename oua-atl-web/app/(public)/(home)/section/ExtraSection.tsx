import Image from "next/image"
import Link from "next/link"
import { SectionDataProps } from "@/app/lib/types"

const ExtraSection: React.FC<SectionDataProps> = ({data})  => {
  const content = data.content
  return (
    <div className="">
      <div className="text-center py-6">
        <h3 className="text-3xl sm:text-4xl font-bold text-primary">{data.header}</h3>
        <p className="max-w-xl text-lg mx-auto text-muted-foreground">{data.subheader}</p>
      </div>

      {content.length && (
        <div className="grid sm:grid-cols-6 gap-6 sm:gap-2 lg:gap-4 xl:gap-6 py-12">
          {
            content.map((item, index) => (
              <figure key={index} className="sm:col-span-2 flex flex-col gap-4">
                <Image
                    src={item.media ?? "/img/int_book.jpg"}
                    alt={item.title ?? "#_"}
                    width={360}
                    height={236}
                    className="bg-gray-200  overflow-hidden w-full object-cover object-center max-h-60"
                  />
                <figcaption className="">
                  <h5 className="text-jet-black text-lg md:text-2xl font-medium mb-2 uppercase peer-hover:underline">{item.title}</h5>
                  <p className="text-body mb-3">{item.text}</p>

                  <Link href={item.action?.href ?? "/interest-groups"} className="text-primary-light gont-medium text-lg hover:underline">{item.action?.label ?? "Learn More"}</Link>
                </figcaption>
              </figure>
            ))
          }
        </div>

      )}

  </div>
  )
}

export default ExtraSection