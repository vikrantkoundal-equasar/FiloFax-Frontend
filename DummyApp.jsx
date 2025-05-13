// In your App.jsx, make sure your Dashboard route uses a wildcard pattern
// This allows the nested routes in Dashboard to work properly

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";

function DummyApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Note the wildcard (*) here which is important for nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default DummyApp;

//Remove utils/auth.js and components/ProtectedRoute.jsx
