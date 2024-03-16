import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import { useEffect, useState } from "react";
import useUserForm from "./UsrForm";
import SignupLogin from "./SignupLoginFunc";
import { supabase } from "./SupaBase";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import MoviePage from "./pages/MoviePage";
import CatagoriePage from "./pages/CatagoriePage";
import Vedio from "./components/TrailerCard";
import AllMoviesMock from "./pages/AllMoviesMock";
import { UserContext } from "./UserContext";
import AccountPage from "./pages/AccountPage";

function App() {
  //form

  const UsrForm = useUserForm();

  //to store user Data in local

  const [usrData, setUsrData] = useState(null);

  //signup and login fucitons

  const SignUpLogInFuctions = SignupLogin(UsrForm.form);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Error retrieving user data");
          return;
        }

        setUsrData(data?.user);
      } catch (error) {
        console.error("Error retrieving user data");
      }
    };

    getUser().then(() => setLoading(false));

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case "SIGNED_IN":
          getUser();
          break;

        case "SIGNED_OUT":
          setUsrData(null);
          break;

        default:
      }

      return () => data.subscription.unsubscribe();
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <UserContext.Provider value={usrData}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginPage
                  UsrForm={UsrForm}
                  handleLogIn={SignUpLogInFuctions.handleLogIn}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <SignUpPage
                  UsrForm={UsrForm}
                  handleSignUp={SignUpLogInFuctions.handleSignUp}
                />
              }
            />

            <Route path="/test/:id" element={<Vedio />} />

            <Route path="/allmovies" element={<AllMoviesMock />} />

            {/* protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute usrData={usrData} UsrForm={UsrForm}>
                  <HomePage usrData={usrData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute usrData={usrData} UsrForm={UsrForm}>
                  <AccountPage/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/catagories/:id"
              element={
                <ProtectedRoute usrData={usrData} UsrForm={UsrForm}>
                  <CatagoriePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies/:title/:id"
              element={
                <ProtectedRoute usrData={usrData} UsrForm={UsrForm}>
                  <MoviePage />
                </ProtectedRoute>
              }
            />

            {/* error  */}
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
