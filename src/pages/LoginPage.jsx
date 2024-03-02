import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SubmitBtn from '../components/SubmitBtn';


function LoginPage({UsrForm,handleLogIn}) {

  const navigate = useNavigate();

  // form and its functions

  const {form,handleMailChange,handlePassChange} = UsrForm;

  const [isLoading,setLoading] = useState(false);


  // on login btn click 

  const handleLogInSubmit = async(e) => {

    setLoading(true);

    e.preventDefault();

    handleLogIn().then(success => {

      if(success){

        navigate('/');

      }

    }).then(()=>{setLoading(false)});

  }

  return (
    <section className='netback'>

      <Navbar links="true" />

      {/* other contents  */}

      <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto md:h-full">
        <div className="w-full rounded-lg border-zinc-800 shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#00000070] backdrop-blur-sm ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Login to your account
            </h1>
            <form onSubmit={handleLogInSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Your email
                </label>
                <input
                  defaultValue={form.email}
                  onChange={handleMailChange}
                  type="email"
                  name="email"
                  id="email"
                  className=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Password
                </label>
                <input
                  onChange={handlePassChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <SubmitBtn text="Sign In" isLoading={isLoading}/>

              <p className="text-sm font-light text-gray-400 ">
                Dont have an account?{" "}
                <Link to="/signup" className="font-medium  hover:underline text-red-500">
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