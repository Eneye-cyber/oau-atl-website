
import { FaChevronRight } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator"
import Button from '@/app/ui/shared/Button'
import type { Metadata } from "next";
import type { GalleryCollection } from "@/app/lib/types";
import { fetchData } from "@/lib/utils/api";
import ActionMenu from "@/components/actions/ActionMenu";

export const metadata: Metadata = {
  title: "Gallery | Ife Alumni",
};

type GalleryResponse = {
  message: string; // Message associated with the response
  payload: GalleryCollection[] | []; // Array of gallery items
  error?: boolean
};

async function getData(): Promise<GalleryResponse> {
  const result = await fetchData('gallery');
  return result;
}

const PhotoAlbum = ({name, count, id, image}: {name: string; count: number, id: string, image: string}) => {
  return (
    <>
    <div className="hover:underline w-full">
      <figure>
        <div 
          role="image"
          style={{
            backgroundImage: `url(${image ? image : 'https://picsum.photos/id/1/200/300'})`
          }}
          className="group bg-slate-100 bg-cover rounded-lg bg-no-repeat overflow-hidden relative transition-all duration-150 ease-out w-full aspect-square ring-1 ring-gray-950/5">
            <div className="absolute top-0 z-10 right-0 p-3 rotate-90">
              <ActionMenu path={"gallery"} id={id} hasView={false} />
            </div>

            <div className="z-0 absolute inset-0 bg-black opacity-0 group-hover:opacity-70" />
        </div>
        <figcaption className="h-14">
          <div className="text-sm font-medium pt-2 break-words tracking-normal overflow-hidden text-ellipsis line-clamp-2 max-h-[40px]">{name}</div>
          <div className="pt-2 text-gray-950/40 text-xs">{count} items</div>
        </figcaption>
      </figure>
    </div>
    </>
  )
}

const page = async () => {
  const data = await getData();
 
  const albums: GalleryCollection[] | [] = data?.payload ?? []
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Gallery</span>
            <span> <FaChevronRight /> </span>
            <span>List</span>
          </div>
          <h1 className="text-2xl font-semibold">Photo Albums</h1>
        </div>

        <Button href="/admin/gallery/create">Create Album</Button>
      </div>


      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 flex-1">
        <div className="py-3">
          <h3 className="text-xl font-bold text-slate-900">Albums listing</h3>
        </div>
        <Separator className="my-3 md:my-6" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 lg:gap-x-6">
          {albums.map((item, index) =>  <PhotoAlbum key={index} id={item.gallery_id} name={item.gallery_title} count={item.item_count} image={item.image_url} />)}
         
          
        </div>
      </section>
    </article>
  )
}



export default page