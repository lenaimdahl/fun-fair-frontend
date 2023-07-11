import "../css/calendar.css";
import React from "react";
import { useState } from "react";
import NewText from "../component/NewText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackendAPI } from "../api/BackendAPIHandler";

function DayView() {
  const [showTextSection, setShowTextSection] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const backendAPIInstance = new BackendAPI();

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  useEffect(() => {
    (async () => {
      const data = await backendAPIInstance.searchEvents(currentDate);
      console.log("events", data.events);
      const convertedData = data.events.map((event) => {
        return {
          id: event._id,
          name: event.title,
          title: event.image,
          startDate: new Date(event.timestamp),
          endDate: new Date(event.timestamp).setHours(0, 30, 0, 0),
        };
      });
      setEvents(convertedData);
    })();
  }, []);

  return (
    <div className="table-container">
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <table>
        <tr>
          <th>Today</th>
        </tr>
        <tr>
          Your events:
          {/* {events.map((event) => (
            <div key={event.id}>
              <img src={event.image} alt={event.name} />
              <span>{event.name}</span>
            </div> */}
          ))}
        </tr>
        <tr>
          <td>your Entry:</td>
        </tr>
      </table>

      {!showTextSection && (
        <button className="button" onClick={handleAddTextClick}>
          <p>Add a new Text Entry for today</p>
        </button>
      )}
      {showTextSection && (
        <div>
          <button onClick={handleCloseTextClick}>
            <p>Close</p>
          </button>
          <NewText />
        </div>
      )}
    </div>
  );
}

export default DayView;
