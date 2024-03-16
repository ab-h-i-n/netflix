import { useState, useEffect } from "react";
import { supabase } from "./SupaBase";

const SignupLogin = (form) => {
  const [usrData, setUsrData] = useState();

  // useEffect(() => {
  //   if (usrData) {
  //     handleTableCreation();
  //   }
  // }, [usrData]);

  const handleSignUp = async () => {
    try {

      console.log(form);

      const { data,error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form?.full_name,
          },
        },
      });


      if (error) {
        alert(error.message);
        return false;
      }

      setUsrData(data);

      alert("Signed Up successfully!");
      return true;

    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const handleLogIn = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        email: form.email,
        password: form.password,
      });

      if (error) {
        alert(error.message);
        return false;
      }

      alert("User Logged In successfully!");
      return true;

    } catch (error) {
      alert(error.message);
      return false;
    }
  };



  return {
    handleLogIn,
    handleSignUp,
  };
};

export default SignupLogin;
