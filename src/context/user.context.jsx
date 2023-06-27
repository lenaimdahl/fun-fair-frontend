import { createContext, useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

const UserContext = createContext();

function convertType(type) {
  switch (type) {
    case "happy":
      return "😊";
    case "sad":
      return "😔";
    case "angry":
      return "😡";
    case "in love":
      return "😍";
    case "sleepy":
      return "😴";
    default:
      return "";
  }
}

const UserContextWrapper = (props) => {
  const [moods, setMoods] = useState();
  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    (async () => {
      const data = await backendAPIInstance.getMoods();
      const convertedData = data.moods.map((mood) => {
        return {
          id: mood._id,
          title: convertType(mood.title),
          startDate: new Date(mood.timestamp),
          endDate: new Date(mood.timestamp).setHours(0, 30, 0, 0),
        };
      });
      console.log(convertedData);
      setMoods(convertedData);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        moods,
        setMoods,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextWrapper };
