import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { loadAuthToken, saveAuthToken, removeToken } from "../util";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setToken = (token) => {
    saveAuthToken(token);
  };

  const authenticateUser = async () => {
    const gotToken = loadAuthToken();
    if (gotToken) {
      try {
        const { data } = await axios.get("http://localhost:5005/auth/verify", {
          headers: { authorization: `Bearer ${gotToken}` },
        });
        setUser(data.user);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setToken,
        authenticateUser,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
