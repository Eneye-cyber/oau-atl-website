import Image from 'next/image'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Great Ife Scholarship Fund | Ife Alumni",
  description: "Great Ife Alumni Association Inc. USA - Atlanta Branch. Donations, projects.",
};

const page = () => {
  return (
    <article className="md:py-6">
      <div className="md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">Great Ife Scholarship Fund</h2>
        <div className="inline-block capitalize relative mt-1">Ile Ife</div>

      </div>

      <div className="container grid grid-cols-1 md:grid-cols-12 gap-6">
        <section className="md:col-span-8">
          <figure className='max-h-96 overflow-hidden shadow-md mb-6'>
            <Image alt="Project" src="/img/scholarship1.jpg" width={420} height={244} className="rounded-md w-full" />
          </figure>

          <div className='text-left leading-10 mb-2'>
            <div className="inline-block text-sm">Aug 21, 2017</div>
          </div>




          <section className="my-3 border-t py-4">
            <p>Donate Now – Give them a chance! Making a gift of any size to the Great Ife Alumni Association Scholarship program is a great way to help students achieve their goals and potential. Your generosity helps ensure that students and their families are offered a rare gift: the ability to have a choice in their education.</p>
          
            <div className="flex">
              
            </div>
          </section>

        </section>

        <aside className="md:col-span-4">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="py-2">
              <h4 className='font-bold text-2xl leading-tight'>$400.00</h4>
              <p className='text-gray-600 text-sm'>raised so far</p>
            </div>

            

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-indigo-700 rounded-full" style={{ width: "40%" }}></div>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 my-6">
              <li>
                <span className="font-medium">Contributors:</span> 10
              </li>
              <li>
                <span className="font-medium">Progress:</span> 40.0%
              </li>
              <li>
                <span className="font-medium">Time Remaining:</span>{" "}
                2 month(s)
              </li>
            </ul>

            <h4 className='font-bold text-xl leading-tight'>$1,000.00</h4>
            <p className='text-gray-600 text-sm'>Contribution goal</p>

            <div className="mt-4 space-y-3">
              <button
                className="inline-block px-4 py-2 w-full text-center bg-white border text-primary rounded-md shadow hover:bg-primary-light"
                >
                Share
              </button>
              <button
                className="inline-block px-4 py-2 w-full text-center bg-primary text-white rounded-md shadow hover:bg-primary-light"
              >
                Donate
              </button>
            </div>
          </div>

        </aside>
        
      </div>

    </article>
  )
}

export default page