
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Error from './pages/Error';
import { useState } from 'react';



function App() {

  const [usrEmail, setUsrEmail] = useState('');

  const handleValueChange = (newEmail) => {
    setUsrEmail(newEmail);
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home handleValueChange={handleValueChange} />} />
        <Route path='/signup' element={<SignUpPage usrEmail={usrEmail} handleValueChange={handleValueChange} />} />
        <Route path='/login' element={<LoginPage usrEmail={usrEmail} />} />

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
