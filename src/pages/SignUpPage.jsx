import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from '../SupaBase';


function SignUpPage({ usrEmail , handleValueChange}) {

  const navigate = useNavigate()

  const [form, setForm] = useState(
    {
      email: usrEmail,
      password: "",
      options: {
        data: {
          full_name: "",
        }
      }

    });

  const handleMailChange = (e) => {

    handleValueChange(e.target.value);

    setForm({
      email: e.target.value,
      password: form.password,
      options: {
        data: {
          full_name: form.options.data.full_name
        }
      }
    })

  }

  const handlePassChange = (e) => {

    setForm({
      email: form.email,
      password: e.target.value,
      options: {
        data: {
          full_name: form.options.data.full_name
        }
      }
    })

  }

  const handleNameChange = (e) => {

    setForm({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: e.target.value,
        }
      }
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log(form);


    //superbase 


    try {


      const { data, error } = await supabase.auth.signUp(
        {
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.options.data.full_name,
            }
          }
        }
      )

      if (error) {

        throw (error);

      } else {

        console.log(data);

        alert("Signed Up succefully!");

        navigate('/login')


      }


    } catch (error) {

      alert(error);

    }


  }


  return (
    <section className="netback">

      <Navbar links="true" />

      {/* other contents  */}

      <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto md:h-full">
        <div className="w-full rounded-lg border-zinc-800 shadow border md:mt-0 sm:max-w-md xl:p-0 bg-[#00000070] backdrop-blur-sm ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
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
                  defaultValue={usrEmail}
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
                    <a
                      className="font-medium  hover:underline text-red-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-500  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
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
