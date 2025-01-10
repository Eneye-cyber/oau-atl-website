import { SectionDataProps } from "@/app/lib/types"

const BannerSection: React.FC<SectionDataProps> = ({data}) => {
  return (
    <section id="banner" className="w-full banner-hero pad">
      <div className="container py-4">
        <div className="flex-center">
          <div className="text-center text-jet-black">
            <h5 className="text-xl font-bold">{data.content[0].text}</h5>
          </div>
        </div>
      </div>

     </section>
  )
}

export default BannerSection