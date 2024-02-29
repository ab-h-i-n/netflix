
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Error from './pages/Error';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import useUserForm from './Form';
import SignupLogin from './SignupLogin';

function App() {

  //form

  const UsrForm = useUserForm();

  //to store user Data in local

  const [usrData, setUsrData] = useState(null);

  //signup and login fucitons 

  const SignUpLogInFuctions = SignupLogin(UsrForm.form);

  useEffect(() => {

    try {

      const userData = secureLocalStorage.getItem('user');

      if(userData){
        setUsrData(userData);
      }

    } catch (error) {

      console.error("Error retrieving user data:", error);

    }

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home usrData={usrData} UsrForm={UsrForm} />} />
        <Route path='/signup' element={<SignUpPage UsrForm={UsrForm} handleSignUp={SignUpLogInFuctions.handleSignUp} />} />
        <Route path='/login' element={<LoginPage UsrForm={UsrForm} handleLogIn={SignUpLogInFuctions.handleLogIn} />} />

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
