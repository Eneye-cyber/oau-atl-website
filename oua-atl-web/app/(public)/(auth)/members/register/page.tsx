import Link from 'next/link'

const page = () => {
  const labelClass = "font-semibold text-jet-black text-sm mb-2 block"
  const inputClass = "border rounded bg-gray-50 text-sm w-full py-2 px-3 text-gray-700 appearance-none focus:outline-none focus-within:border-primary-light"
  return (
    <>
      <section className="rounded-md shadow-lg w-full overflow-hidden lg:max-w-screen-lg">
        <div className="rounded-md w-full justify-center overflow-hidden md:flex">
          <aside
            className="bg-jet-black bg-opacity-50 text-primary p-8 hidden justify-center items-center md:flex md:w-1/3 "
          >
            <div
              className="bg-contain bg-center bg-no-repeat bg-opacity-50 h-64 text-white w-64">
                {/* Logo Background image */}
              </div>
          </aside>
          <section className="bg-white flex-grow h-screen overflow-y-auto md:h-full p-8 md:p-12">
            <form className="flex flex-col h-full" >
              <h1 className="font-bold text-center text-lg pb-4 uppercase md:text-xl md:pb-8 lg:text-2xl">
                Create a new account
              </h1>

              <div className="py-4 grid md:grid-cols-2 gap-2">
                <div className="">
                  <label htmlFor="first_name" className={`${labelClass}`} >
                    Firstname
                  </label>
                  <input
                    id="first_name"
                    name='first_name'
                    type="text"
                    required
                    placeholder="First name"
                    className={`${inputClass}`}
                  />
                </div>

                <div className="">
                  <label htmlFor="last_name" className={`${labelClass}`} >
                    Lastname
                  </label>
                  <input
                    id="last_name"
                    name='last_name'
                    type="text"
                    required
                    placeholder="Last name"
                    className={`${inputClass}`}
                  />
                </div>


              </div>
              <div className="py-4">
                <label htmlFor="email" className={`${labelClass}`} >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  required
                  placeholder="Email/Username"
                  className={`${inputClass}`}
                />
              </div>

              <div className="pb-4">
                <label htmlFor="password" className={`${labelClass}`} >
                  Password 
                </label>
                <input
                  placeholder="*******"
                  id="password"
                  type="password"
                  required
                  className={`${inputClass}`}
                />
              </div>

              <div className="py-4">
                <input type="submit" value="Log in" className="inline-flex w-full py-3 text-white bg-primary font-semibold hover:bg-jet-black cursor-pointer" />
              </div>
            </form>

            <div className="text-center">
              <p>
                Don&apos;t have an account? &nbsp;
                <Link
                  href="/members/register"
                  className="font-semibold text-sm text-primary inline-block align-baseline hover:text-primary-dark hover:underline"
                >
                  Sign up here
                </Link>
              </p>
                
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default page