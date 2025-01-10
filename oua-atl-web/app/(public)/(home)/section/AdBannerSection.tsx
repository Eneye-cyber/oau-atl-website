import { SectionDataProps } from "@/app/lib/types"
import Button from "@/app/ui/shared/Button";

const AdBannerSection: React.FC<SectionDataProps> = ({data}) => {

  return (
    <section id="banner" className="w-full banner-hero">
      <div className="container py-8">
        <div className="flex-column items-center space-y-2  md:flex-between md:flex-row">
          <div className="text-center md:text-left text-jet-black">
            <h5 className="text-2xl font-bold">{data.content[0].title}</h5>
            <p>{data.content[0].subtitle}</p>
          </div>
          {
            data.content[0].action && <Button href={`/${data.content[0].action?.href}`}>{data.content[0].action?.label}</Button>
          }
          
        </div>
      </div>
    </section>
   )
}

export default AdBannerSection