import Link from 'next/link'
import type { Metadata } from 'next'
import SignInForm from '@/app/ui/forms/SignInForm'
 
export const metadata: Metadata = {
  title: 'ATL Login',
}

const page = () => {
  return (
    <>
      <section className="rounded-md shadow-lg w-full overflow-hidden lg:max-w-screen-lg">
        <div className="rounded-md w-full justify-center overflow-hidden md:flex">
          <aside
            className="bg-gray-50 bg-opacity-50 text-primary p-8 hidden justify-center items-center md:flex md:w-1/3 lg:w-1/2"
          >
            <div
              className="bg-contain bg-center bg-no-repeat bg-opacity-50 h-64 text-white w-64">
                {/* Logo Background image */}
              </div>
          </aside>
          <section className="bg-white flex-grow h-screen overflow-y-auto md:h-full p-8 md:p-12">
            
            <SignInForm />
            
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