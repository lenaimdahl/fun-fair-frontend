import "../css/calendar.css";
import React from "react";
import { useState, useEffect } from "react";
import NewText from "../component/NewText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BackendAPI } from "../api/BackendAPIHandler";

function DayView() {
  const [showTextSection, setShowTextSection] = useState(false);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const backendAPIInstance = new BackendAPI();

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  const handleDateChange = async (date) => {
    setStartDate(date);
    console.log(typeof startDate);
    const data = await backendAPIInstance.searchEvents(startDate);
    console.log("events", data.allEvents);
    setEvents(data.allEvents);
  };

  // useEffect(() => {
  //   (async () => {

  //   })();
  // }, []);

  return (
    <div className="table-container">
      <DatePicker showIcon selected={startDate} onChange={handleDateChange} />
      <table>
        <thead>
          <tr>
            <th>Today</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Your events:
              {events.map((event) => (
                <div key={event.id}>
                  <img src={event.image} alt={event.name} />
                  <span>{event.name}</span>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>your Entry:</td>
          </tr>
        </tbody>
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
