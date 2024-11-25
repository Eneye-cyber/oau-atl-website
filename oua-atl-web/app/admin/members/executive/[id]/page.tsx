/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image'


export default function page() {

  return (
    <article className="space-y-6 flex-1 flex flex-col">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-3 mt-12">

        <section className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-12 md:gap-6">
          <figure className='max-h-96 overflow-hidden shadow-md mb-6 sm:col-span-4'>
            <Image alt="Project" src="/img/scholarship1.jpg" width={420} height={244} className="rounded-md object-cover h-full" />
          </figure>

          <div className="sm:col-span-8">
            <div className="">
              <h2 className="text-xl md:text-3xl font-semibold text-jet-black">Ajayi Crowther</h2>
              <p className="text-gray-600 text-sm">
                Position: <span className="font-medium">Alumi President</span> <br />
                Graduating year: <span className="font-medium">20/22</span> <br />
              </p>
            </div>

            <section className="my-3 border-t py-4">
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Bio summary</span> <br />
              </p>
              <p>Ngozi Onyekaba studied Electronic / Electrical Engineering from Great Ife and graduated in 1986. She went on to obtain a masters degree in Information Engineering. She is currently working in as a Business Intelligence leader in one of the automobile companies.Her passion includes discovering new technologies and empowering the younger generation. Ngozi enjoys gardening.</p>
            
            </section>

          </div>
  


        </section>

        <section className="lg:col-span-12">
          <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <p className="text-gray-600 text-sm mb-2"> <span className="font-semibold">Full Biography</span> <br /> </p>
            <p>Ngozi Onyekaba studied Electronic / Electrical Engineering from Great Ife and graduated in 1986. She went on to obtain a masters degree in Information Engineering. She is currently working in as a Business Intelligence leader in one of the automobile companies.Her passion includes discovering new technologies and empowering the younger generation. Ngozi enjoys gardening.</p>
            

            <div className="mt-4 flex justify-end">
             
              <button
                className="ml-auto inline-block px-4 py-2 w-full sm:w-fit text-center  border border-red-700 text-red-700 hover:text-white rounded-md shadow hover:bg-primary-light hover:border-none"
              >
                Disable Executive Status
              </button>
            </div>
          </div>

        </section>

      </section>
    </article>
  )
}
