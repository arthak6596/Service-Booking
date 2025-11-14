import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, Routes } from "react-router-dom";
import {Home, Login, Services, SignUp, ForgotPassword, Search, ResetPassword, Profile} from "./pages"

function App() {
  return (
    <div className="h-screen">
      <div className=" overflow-y-scroll no-scrollbar h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search/*" element={<Search />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
