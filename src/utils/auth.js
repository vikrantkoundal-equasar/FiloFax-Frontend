import Cookies from "js-cookie";

export const isAuthenticated = () => {
  // Check both localStorage and Cookies for compatibility
  const cookieToken = Cookies.get("token");
  const localToken = localStorage.getItem("token");
  return !!(cookieToken || localToken);
};

export const setAuthToken = (token) => {
  if (token) {
    // Store token in both places to ensure compatibility
    Cookies.set("token", token, { path: "/" });
    localStorage.setItem("token", token);
    return true;
  }
  return false;
};

export const clearAuthToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
};
