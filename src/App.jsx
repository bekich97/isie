import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Otp from "./pages/Otp";
import { useDispatch, useSelector } from "react-redux";
import { load_user } from "./actions/auth";
import { Spinner } from "react-bootstrap";
import MyProfile from "./pages/MyProfile";
import Profile from "./pages/Profile";
import Header from "./pages/layouts/Header";
import Footer from "./pages/layouts/Footer";

function App() {
  const dispatch = useDispatch();
  const showSpinner = useSelector((state) => state.mainSlice.showSpinner);

  useEffect(() => {
    load_user(dispatch);
  }, [dispatch]);
  return (
    <div className="app_wrapper">
      {/* Header */}
      <section className="header-section">
        <Header />
      </section>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/p/:nickname" element={<Profile />} />
          {/* Auth routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
          <Route
            path="/reset-password-confirm/"
            element={<ResetPasswordConfirm />}
          />
          <Route path="/otp-check/" element={<Otp />} />
          {/* Errors */}
        </Routes>
      </div>
      {/* Footer */}
      <section className="footer">
        <Footer />
      </section>
      {showSpinner ? (
        <div id="spinner-wrapper">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
