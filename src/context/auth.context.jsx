import { createContext, useContext, useEffect, useState } from "react";
import { loadAuthToken, saveAuthToken, removeToken } from "../util";
import { APIContext } from "./api.context";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const { backendAPIInstance, setBackendAPIInstance } = useContext(APIContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  backendAPIInstance.api.interceptors.response.use(null, (error) => {
    if (error.response.status === 401) {
      logOutUser();
    }
    throw error;
  });

  setBackendAPIInstance(backendAPIInstance);

  const setToken = (token) => {
    saveAuthToken(token);
  };

  const logOutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    removeToken();
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
