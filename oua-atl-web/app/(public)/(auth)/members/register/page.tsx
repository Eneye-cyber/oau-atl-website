import Link from 'next/link'
import SignUpForm from '@/app/ui/forms/SignUpForm'

const page = () => {
  const labelClass = "font-semibold text-jet-black text-sm mb-2 block"
  const inputClass = "border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light"
  return (
    <>
      <section className="rounded-md shadow-lg w-full overflow-hidden lg:max-w-screen-lg">
        <div className="rounded-md w-full justify-center items-stretch overflow-hidden md:flex">
          <aside
            className="bg-jet-black bg-opacity-50 text-primary p-8 hidden justify-center items-center md:flex md:w-1/3 "
          >
            <div
              className="bg-contain bg-center bg-no-repeat bg-opacity-50 h-64 text-white w-64">
                {/* Logo Background image */}
              </div>
          </aside>
          <section className="bg-white flex-grow min-h-64 overflow-y-auto md:h-full p-8 md:p-12 relative">

            <SignUpForm />

          </section>
        </div>
      </section>
    </>
  )
}

export default page