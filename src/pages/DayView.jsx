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
  const [entries, setEntries] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const backendAPIInstance = new BackendAPI();

  const handleAddTextClick = () => {
    setShowTextSection(true);
  };

  const handleCloseTextClick = () => {
    setShowTextSection(false);
  };

  const handleDateChange = async (date) => {
    const dateAtMidnight = new Date(date);
    dateAtMidnight.setHours(0, 0, 0, 0);
    setStartDate(dateAtMidnight);
    const { allEvents, allEntries } = await backendAPIInstance.searchEvents(
      dateAtMidnight
    );
    setEvents(allEvents);
    setEntries(allEntries);
  };

  useEffect(() => {
    handleDateChange(startDate);
  }, []);

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
                  {event.image} {event.title}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>
              Your Entries:
              {entries.map((entry) => (
                <div key={entry.id}>
                  {entry.image} {entry.title}
                </div>
              ))}
            </td>
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
