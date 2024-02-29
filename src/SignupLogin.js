import { supabase } from "./SupaBase";
import secureLocalStorage from "react-secure-storage";

const SignupLogin = (form) => {

    // signup
    const handleSignUp = async () => {
        try {
            console.log(form);

            const { data, error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    data: {
                        full_name: form.options.data.full_name,
                    },
                },
            });

            if (error) {
                alert(error);
            }

            secureLocalStorage.setItem("user", data);

            console.log(data);

            alert("Signed Up successfully!");

        } catch (error) {
            alert(error);
        }
    }

    // Login
    const handleLogIn = async () => {
        try {
            console.log(form);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            });

            if (error) {
                alert(error);
            }

            secureLocalStorage.setItem("user", data);

            console.log(data);

            alert('User Signed Up successfully!');

        } catch (error) {
            alert(error);
        }
    };

    return {
        handleLogIn,
        handleSignUp
    };
};

export default SignupLogin;
