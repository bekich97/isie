import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Base from "./pages/layouts/Base";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Otp from "./pages/Otp";

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
          <Route path="/reset-password-confirm/" element={<ResetPasswordConfirm />} />
          <Route path="/otp-check/" element={<Otp />} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;
