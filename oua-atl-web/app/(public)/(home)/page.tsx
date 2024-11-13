import Button from "@/app/ui/shared/Button"

const page = () => {
  return (
    <>
     <section aria-label="hero h-full md:max-h-hero">
      <div className="w-full"></div>
     </section>

     <section id="banner" className="w-full banner-hero">
      <div className="container py-8">
        <div className="flex-column items-center space-y-2  md:flex-between md:flex-row">
          <div className="text-center md:text-left text-jet-black">
            <h5 className="text-2xl font-bold">Are you new to our website?</h5>
            <p>We&apos;d love you to join us at an event we have coming up</p>
          </div>

          <Button>Find Out More</Button>
        </div>
      </div>

     </section>

    </>
  )
}

export default page