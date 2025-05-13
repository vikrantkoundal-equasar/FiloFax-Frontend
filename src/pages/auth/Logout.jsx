import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Redux se user ko logout karo
    dispatch(logout());

    // 2. Cookies hata do (token aur refreshToken)
    Cookies.remove("token");
    Cookies.remove("refreshToken");

    // 3. User ko login page pe bhejo
    navigate("/login");
  }, [dispatch, navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
