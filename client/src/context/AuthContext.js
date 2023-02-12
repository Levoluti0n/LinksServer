import { createContext } from "react";
import Routes from "../router/Routes";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/auth.hook";

export const AuthContext = createContext();

export const AuthProvider = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      {isAuthenticated && <Navbar />}
      {routes}
    </AuthContext.Provider>
  );
};
