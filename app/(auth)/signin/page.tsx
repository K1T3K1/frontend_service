export const metadata = {
  title: 'Sign In',
  description: 'Page description',
}

import Link from 'next/link'

export default function SignIn() {
  return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">

            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Welcome back.</h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-gray-400 ml-2">Keep me signed in</span>
                      </label>
                      <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <Link href="/dashboard" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                    Sign in
                  </Link>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                No account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}