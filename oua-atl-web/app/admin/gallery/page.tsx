
import { FaChevronRight } from "react-icons/fa6";
// import Button from '@/app/ui/shared/Button'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LuMoreVertical, LuEye, LuFileEdit, LuTrash2 } from 'react-icons/lu';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PhotoAlbum = () => {
  return (
    <>
    <Link href="/admin/gallery/album/id" className="hover:underline w-full">
      <figure>
        <div 
          role="image"
          style={{
            backgroundImage: "url('https://picsum.photos/id/1/200/300')"
          }}
          className="group bg-slate-100 bg-cover rounded-lg bg-no-repeat overflow-hidden relative transition-all duration-150 ease-out w-full aspect-square ring-1 ring-gray-950/5">
            <div className="absolute top-0 z-10 right-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="h-8 w-8 p-0 flex-center">
                    <span className="sr-only">Open menu</span>
                    <LuMoreVertical className="text-white" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-40" align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-950/5" />
                  <DropdownMenuItem>
                    <LuEye className="inline-block mr-1" />
                    View Album
                  </DropdownMenuItem>
                  <DropdownMenuItem> 
                    <Link href="/admin/gallery/3/edit">
                      <LuFileEdit className="inline-block mr-1" />
                      <span>Edit Album</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <LuTrash2 className="inline-block mr-1" />
                    Delete Album
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="z-0 absolute inset-0 bg-black opacity-0 group-hover:opacity-70" />
        </div>
        <figcaption className="h-14">
          <div className="text-sm font-medium pt-2 break-words tracking-normal overflow-hidden text-ellipsis line-clamp-2 max-h-[40px]">Album Name</div>
          <div className="pt-2 text-gray-950/40 text-xs">10 items</div>
        </figcaption>
      </figure>
    </Link>
    </>
  )
}
const page = () => {
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

        <CreateAlbumDialog />
      </div>


      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 flex-1">
        <div className="py-3 mb-3 sm:mb-6 border-b border-black/50">
          <h3 className="text-xl font-bold text-slate-900">Albums listing</h3>
        </div>
        <DropdownMenuSeparator className="bg-gray-950/5" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 lg:gap-x-6">
          <PhotoAlbum />
          <PhotoAlbum />
          <PhotoAlbum />
          <PhotoAlbum />
        </div>
      </section>
    </article>
  )
}



function CreateAlbumDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Album</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create album</DialogTitle>
          <DialogDescription>
            Create a new photo album to upload pictures.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="sr-only">
              Album Name
            </Label>
            <Input
              id="name"
              defaultValue="Convention 2019"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="bg-primary" variant="secondary">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default page