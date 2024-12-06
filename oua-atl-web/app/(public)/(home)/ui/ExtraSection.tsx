import Image from "next/image"
import Link from "next/link"

const ExtraSection = () => {
  return (
    <div className="">
      <div className="text-center py-6">
        <h3 className="text-3xl sm:text-4xl font-bold text-primary">Get Involved</h3>
        <p className="max-w-xl text-lg mx-auto text-muted-foreground">Let&apos;s harness the power of our alumni network. Your involvement will foster a thriving learning environment and create lasting impact.</p>
      </div>

      <div className="grid sm:grid-cols-6 sm:gap-2 lg:gap-4 xl:gap-6 py-12">
        <figure className="sm:col-span-2 flex flex-col gap-4">
          <Image
              src="/img/int_book.jpg"
              alt="#_"
              width={360}
              height={300}
              className="bg-gray-200  overflow-hidden w-full object-cover object-center"
            />
          <figcaption className="">
            <h5 className="text-jet-black text-lg md:text-2xl font-medium mb-2 uppercase peer-hover:underline">Join An Interest Group</h5>
            <p className="text-body mb-3">Interest groups give members the opportunity to build connections around shared interests and hobbies.</p>

            <Link href="/interest-groups" className="text-primary-light gont-medium text-lg hover:underline">Learn More</Link>
          </figcaption>
        </figure>
        <figure className="sm:col-span-2 flex flex-col gap-4">
          <Image
                src="/img/reunion.jpg"
                alt="#_"
                width={360}
                height={300}
                className="bg-gray-200  overflow-hidden w-full object-cover object-center"
              />
            <figcaption className="">
              <h5 className="text-jet-black text-lg md:text-2xl font-medium mb-2 uppercase peer-hover:underline">The Alumni Experience</h5>
              <p className="text-body mb-3">Explore the variety of benefits and services available to members of Great Ife Atlanta Alumni community.</p>

              <Link href="/members-area" className="text-primary-light gont-medium text-lg hover:underline">Learn More</Link>
            </figcaption>
        </figure>
        <figure className="sm:col-span-2 flex flex-col gap-4">
          <Image
              src="/img/mem-due.jpg"
              alt="#_"
              width={360}
              height={300}
              className="bg-gray-200  overflow-hidden w-full object-cover object-center"
            />
          <figcaption className="">
            <h5 className="text-jet-black text-lg md:text-2xl font-medium mb-2 uppercase peer-hover:underline">Membership dues</h5>
            <p className="text-body mb-3">Join the OAU alumni network! Registration is free, however members are expected to pay membership dues.</p>

            <Link href="/members-area#subscribe" className="text-primary-light gont-medium text-lg hover:underline">Learn More</Link>
          </figcaption>
        </figure>
      </div>
  </div>
  )
}

export default ExtraSection