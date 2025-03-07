import type { Metadata } from "next";
import EditProjectPage from "./ui/edit-project-page"


export const metadata: Metadata = {
  title: "Edit Project | Atl Dashboard",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Events and Hangount.",
};



const page = async ({ params }: { params: { id: string } }) => {

  
  return (
    <>
      <EditProjectPage params={params} />
    </>
  )
}




export default page