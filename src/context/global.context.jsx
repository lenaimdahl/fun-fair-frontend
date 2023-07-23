import { createContext, useContext, useState, useEffect } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";
import { AuthContext } from "../context/auth.context";

const GlobalContext = createContext();

const GlobalContextWrapper = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const backendAPIInstance = new BackendAPI();

  const fetchMeetings = async () => {
    const data = await backendAPIInstance.getMeetingsByUser();
    const convertedData = data.meetings.map((meeting) => {
      const combinedTitle = `${meeting.image} ${meeting.title}`;
      return {
        id: meeting._id,
        title: combinedTitle,
        timestamp: meeting.timestamp,
      };
    });
    setMeetings(convertedData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMeetings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider value={{ meetings, setMeetings, fetchMeetings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextWrapper };
