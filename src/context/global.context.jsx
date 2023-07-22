import { createContext, useState, useEffect } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

const GlobalContext = createContext();

const GlobalContextWrapper = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  const backendAPIInstance = new BackendAPI();

  useEffect(() => {
    (async () => {
      const data = await backendAPIInstance.getMeetingsByUser();
      const convertedData = data.meetings.map((meeting) => {
        const combinedTitle = `${meeting.image} ${meeting.title}`;
        return {
          title: combinedTitle,
          timestamp: meeting.timestamp,
        };
      });
      setMeetings(convertedData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <GlobalContext.Provider value={{ meetings, setMeetings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextWrapper };
