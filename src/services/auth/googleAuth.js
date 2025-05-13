import axios from "axios";
import { redirect } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_AUTH_URL;
export const initiateGoogleSignUp = () => {
  console.log("Initiating Google sign-up...");

  // Simply redirect the browser to your backend Google OAuth route
  window.location.href = `${baseURL}/google`;
};

export default {
  initiateGoogleSignUp,
};
