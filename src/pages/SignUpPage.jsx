import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SubmitBtn from "../components/SubmitBtn";
import { supabase } from "../SupaBase";


function SignUpPage({ UsrForm, handleSignUp }) {

  const navigate = useNavigate();

  const { form, handleMailChange, handlePassChange, handleNameChange } = UsrForm;

  const [isLoading , setLoading] = useState(false);

  const handleSignUpSubmit = async (e) => {

    setLoading(true)

    e.preventDefault();

    handleSignUp().then(async()=>{
      

      try {
        
        const { data, errors } = await supabase.auth.getUser();
        console.log("user_data : ",data);
        const { error } = await supabase.from("user_data").insert([{
          bio: "",
          email: data?.user.email,
          name: data?.user.user_metadata.full_name,
          id:data?.user.id
        }])
      } catch (error) {
        console.log(error);
      }
    })
    .then(() => navigate('/')).then(()=>{setLoading(false)});

  }

  return (
    <section className="netback">

      <Navbar/>

      {/* other contents  */}

      <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto md:h-full">
        <div className="w-full rounded-lg border-zinc-800 shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#00000070] backdrop-blur-sm ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create account
            </h1>
            <form onSubmit={handleSignUpSubmit} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Your Name
                </label>
                <input
                  onChange={handleNameChange}
                  type="text"
                  name="name"
                  id="name"
                  className=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Name"
                  required
                />
              </div>
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
                  className=" border  sm:text-sm rounded-lg   block w-full p-2.5 bg-zinc-900 border-red-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border rounded  focus:ring-3 accent-red-600  bg-zinc-900 border-red-500  ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-400 ">
                    I accept the{" "}
                    <span
                      className="font-medium  hover:underline text-red-500"
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>
              </div>

              <SubmitBtn text="Create Account" isLoading={isLoading}/>

              <p className="text-sm font-light text-gray-400 ">
                Already have an account?{" "}
                <Link to="/login" className="font-medium  hover:underline text-red-500">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
