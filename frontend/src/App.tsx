import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Toaster } from "react-hot-toast";
import VerificationInstructions from "./pages/verification";
import VerifyToken from "./pages/verifyToken";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <>
      <Toaster position="top-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/verification" element={<VerificationInstructions/>}/>
          <Route path="/verify/:token" element={<VerifyToken/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
