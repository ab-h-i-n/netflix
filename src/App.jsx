
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Error from './pages/Error';
import { useEffect, useState } from 'react';
import useUserForm from './UsrForm';
import SignupLogin from './SignupLoginFunc';
import { supabase } from "./SupaBase";
import ProtectedRoute from './ProtectedRoute';

function App() {

  //form

  const UsrForm = useUserForm();

  //to store user Data in local

  const [usrData, setUsrData] = useState(null);

  //signup and login fucitons 

  const SignUpLogInFuctions = SignupLogin(UsrForm.form);


  useEffect(() => {

    try {

      const getUser = async () => {

        const { data } = await supabase.auth.getUser();

        setUsrData(data?.user);

        supabase.auth.onAuthStateChange((event, data) => {

          switch (event) {

            case "SIGNED_IN":

              setUsrData(data?.user);
              break;

            case "SIGNED_OUT":

              setUsrData(null);
              break;

            default:
              break;
          }

        });
      };

      getUser();
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home usrData={usrData} UsrForm={UsrForm} />} />

        <Route path='/login' element={

          <ProtectedRoute usrData={usrData}>
            <LoginPage UsrForm={UsrForm} handleLogIn={SignUpLogInFuctions.handleLogIn} />
          </ProtectedRoute>
        } />

        <Route path='/signup' element={
          
          <ProtectedRoute usrData={usrData}>
            <SignUpPage UsrForm={UsrForm} handleSignUp={SignUpLogInFuctions.handleSignUp} />
          </ProtectedRoute>
        } />

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
