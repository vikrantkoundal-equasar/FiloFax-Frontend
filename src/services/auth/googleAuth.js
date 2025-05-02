import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_AUTH_URL;

export const initiateGoogleSignUp = async () => {
  console.log("url", baseURL);
  try {
    console.log("Initiating Google sign-up...");

    const response = await axios.get(`${baseURL}/google`);

    console.log(response, "response is ==>>");
    console.log("response coming is ==>>", response.data);

    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.error("Error initiating Google sign-up:", error);
    throw error;
  }
};

export default {
  initiateGoogleSignUp,
};
