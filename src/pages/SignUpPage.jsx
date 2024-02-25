import React from "react";
import { Link } from "react-router-dom";
import BgImg from "../components/BgImg";

function SignUpPage() {
  return (
    <section>

        <BgImg/>

        {/* other contents  */}

      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div class="w-full rounded-lg border-zinc-800 shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#ffffff10] backdrop-blur-sm ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create account
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
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium  text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border rounded  focus:ring-3  bg-zinc-900 border-red-500  ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-400 ">
                    I accept the{" "}
                    <a
                      class="font-medium  hover:underline text-red-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-red-600 hover:bg-red-500  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-400 ">
                Already have an account?{" "}
                <a href="#" class="font-medium  hover:underline text-red-500">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
