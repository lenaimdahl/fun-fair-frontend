import { createContext, useContext, useEffect, useState } from "react";
import { loadAuthToken, saveAuthToken, removeToken } from "../util";
import { GlobalContext } from "./global.context";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const { backendAPIInstance } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!loadAuthToken());

  const setToken = (token) => {
    saveAuthToken(token);
  };

  const logOutUser = () => {
    console.log("Logging the user out ...");
    setUser(null);
    setIsLoggedIn(false);
    removeToken();
  };

  window.util = {
    logout: logOutUser,
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
        logOutUser,
        setIsLoggedIn,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
