import { supabase } from "./SupaBase";

const SignupLogin = (form) => {

  // signup
  const handleSignUp = async () => {
    try {

      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
          },
        },
      });
      

      if (error) {
        alert(error);
        return false;
      }

      alert("Signed Up successfully!");
      return true;

    } catch (error) {
      alert(error);
      return false;
    }
  }

  // Login
  const handleLogIn = async () => {
    try {

      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) {
        alert(error);
        return false;
      }

      alert('User Signed Up successfully!');
      return true;

    } catch (error) {
      alert(error);
      return false;
    }
  };

  return {
    handleLogIn,
    handleSignUp
  };
};

export default SignupLogin;
