
import { BrowserRouter, Routes,Route  } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Error from './pages/Error';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
