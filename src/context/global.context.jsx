import { createContext, useEffect, useState } from "react";
import { BackendAPI } from "../api/BackendAPIHandler";

const GlobalContext = createContext();

const GlobalContextWrapper = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const backendAPIInstance = new BackendAPI();

  backendAPIInstance.api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        window.util.logout();
      } else {
        throw error;
      }
    }
  );

  const fetchMeetings = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{ backendAPIInstance, meetings, setMeetings, fetchMeetings }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextWrapper };
