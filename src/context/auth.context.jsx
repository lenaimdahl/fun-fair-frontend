import { createContext, useEffect, useState } from "react";
import { loadAuthToken, saveAuthToken, removeToken } from "../util";
import { BackendAPI } from "../api/BackendAPIHandler";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backendAPIInstance = new BackendAPI();

  const setToken = (token) => {
    saveAuthToken(token);
  };

  const authenticateUser = async () => {
    const gotToken = loadAuthToken();
    if (gotToken) {
      try {
        const user = await backendAPIInstance.verifyUser(gotToken);
        setUser(user);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoading(false);
        logOutUser();
      }
    } else {
      setIsLoading(false);
      logOutUser();
    }
  };

  const logOutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    removeToken();
  };

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
