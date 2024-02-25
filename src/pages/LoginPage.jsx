import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function LoginPage() {
  return (
    <section className='netback'>

      <Navbar/>

        {/* other contents  */}

      <div class="flex flex-col items-center justify-center px-6 py-32 mx-auto md:h-full">
        <div class="w-full rounded-lg border-zinc-800 shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#00000070] backdrop-blur-sm ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Login to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              
              <button
                type="submit"
                class="w-full text-white bg-red-600 hover:bg-red-500  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
              <p class="text-sm font-light text-gray-400 ">
                Dont have an account?{" "}
                <Link to="/signup" class="font-medium  hover:underline text-red-500">
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage