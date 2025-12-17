export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
    if(typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
