import { createContext, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

const APIContext = createContext();

const APIContextWrapper = ({ children }) => {
  const [backendAPIInstance, setBackendAPIInstance] = useState(
    new BackendAPI()
  );

  return (
    <APIContext.Provider value={{ backendAPIInstance, setBackendAPIInstance }}>
      {children}
    </APIContext.Provider>
  );
};

export { APIContext, APIContextWrapper };
