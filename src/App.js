import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/auth/login";
import Landing from "./Pages/userapp/landing";
import Signup from "./Pages/auth/signup";
import ForgotPassword from "./Pages/auth/ForgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
